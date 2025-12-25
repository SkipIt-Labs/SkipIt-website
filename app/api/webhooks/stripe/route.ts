import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function toIsoFromUnixSeconds(sec: number | null | undefined) {
  if (!sec || Number.isNaN(sec)) return null;
  return new Date(sec * 1000).toISOString();
}

function getCurrentPeriodEndSeconds(
  subscription: Stripe.Subscription | null | undefined
): number | null {
  // Stripe returns this field, but some Stripe TS versions don't include it on the type.
  const val = (subscription as any)?.current_period_end;
  return typeof val === "number" ? val : null;
}

function hasAccessFromStripeStatus(status: Stripe.Subscription.Status) {
  // Keep access during "active" and common grace periods. Access is revoked on subscription.deleted.
  return status === "active" || status === "trialing" || status === "past_due";
}

async function findProfileIdByStripe(
  customerId: string | null,
  subscriptionId: string | null
) {
  if (!customerId && !subscriptionId) return null;

  const filters: string[] = [];
  if (customerId) filters.push(`stripe_customer_id.eq.${customerId}`);
  if (subscriptionId) filters.push(`stripe_subscription_id.eq.${subscriptionId}`);

  const { data } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .or(filters.join(","))
    .maybeSingle();

  return data?.id ?? null;
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Stripe webhook signature verification failed:", err?.message || err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId ?? null;
        const plan = session.metadata?.plan ?? null;

        if (!userId) {
          console.warn("checkout.session.completed missing metadata.userId", { sessionId: session.id });
          break;
        }

        const expanded = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ["subscription", "customer"],
        });

        const customerId =
          typeof expanded.customer === "string"
            ? expanded.customer
            : expanded.customer?.id ?? null;

        const subscription =
          typeof expanded.subscription === "string"
            ? await stripe.subscriptions.retrieve(expanded.subscription)
            : expanded.subscription ?? null;

        const subscriptionId = subscription?.id ?? null;
        const status = subscription?.status ?? null;
        const cancelAtPeriodEnd = subscription?.cancel_at_period_end ?? null;
        const currentPeriodEnd = toIsoFromUnixSeconds(getCurrentPeriodEndSeconds(subscription));

        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            plan,
            // "status" + "current_period_end" are optional columns you should add in Supabase
            status,
            cancel_at_period_end: cancelAtPeriodEnd,
            current_period_end: currentPeriodEnd,
            // Access control used by the app
            is_subscribed: status ? hasAccessFromStripeStatus(status) : true,
          })
          .eq("id", userId);

        if (error) {
          console.error("Supabase update error (checkout.session.completed):", error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionId = subscription.id;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer?.id ?? null;

        const profileId = await findProfileIdByStripe(customerId, subscriptionId);
        if (!profileId) {
          console.warn("No profile found for subscription.updated", { customerId, subscriptionId });
          break;
        }

        const status = subscription.status;
        const cancelAtPeriodEnd = subscription.cancel_at_period_end;
        const currentPeriodEnd = toIsoFromUnixSeconds(getCurrentPeriodEndSeconds(subscription));

        // CRITICAL behavior: if user cancels mid-cycle, Stripe keeps status "active" until period end.
        // We store both status + cancel_at_period_end + current_period_end, and keep is_subscribed true
        // while status is active/trialing/past_due.
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            status,
            cancel_at_period_end: cancelAtPeriodEnd,
            current_period_end: currentPeriodEnd,
            is_subscribed: hasAccessFromStripeStatus(status),
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
          })
          .eq("id", profileId);

        if (error) {
          console.error("Supabase update error (customer.subscription.updated):", error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionId = subscription.id;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer?.id ?? null;

        const profileId = await findProfileIdByStripe(customerId, subscriptionId);
        if (!profileId) {
          console.warn("No profile found for subscription.deleted", { customerId, subscriptionId });
          break;
        }

        const currentPeriodEnd = toIsoFromUnixSeconds(getCurrentPeriodEndSeconds(subscription));

        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            status: "canceled",
            cancel_at_period_end: false,
            current_period_end: currentPeriodEnd,
            is_subscribed: false,
            stripe_subscription_id: null,
          })
          .eq("id", profileId);

        if (error) {
          console.error("Supabase update error (customer.subscription.deleted):", error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }

        break;
      }

      default:
        // ignore other events
        break;
    }
  } catch (err: any) {
    console.error("Stripe webhook handler error:", err?.message || err, err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}


