import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook verify failed:", err?.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan;

    console.log("checkout.session.completed", { userId, plan, sessionId: session.id });

    if (!userId) {
      console.error("No userId in session metadata");
      return NextResponse.json({ received: true });
    }

    // Extinde session-ul pentru a obține subscription și customer
    const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['subscription', 'customer']
    });

    const customerId = typeof expandedSession.customer === 'string' 
      ? expandedSession.customer 
      : expandedSession.customer?.id || null;
    
    const subscriptionId = typeof expandedSession.subscription === 'string'
      ? expandedSession.subscription
      : expandedSession.subscription?.id || null;

    console.log("Expanded session data", { userId, plan, customerId, subscriptionId });

    if (!customerId || !subscriptionId) {
      console.error("Missing customer_id or subscription_id", { customerId, subscriptionId });
      // Încercăm să actualizăm doar is_subscribed și plan, fără stripe IDs
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({ 
          is_subscribed: true, 
          plan
        })
        .eq("id", userId);

      if (error) {
        console.error("Supabase update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ received: true });
    }

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ 
        is_subscribed: true, 
        plan,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId
      })
      .eq("id", userId);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Successfully updated profile for user:", userId);
  }

  // Handler pentru când subscription-ul este creat (backup)
  if (event.type === "customer.subscription.created") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = typeof subscription.customer === 'string' 
      ? subscription.customer 
      : subscription.customer?.id;

    console.log("customer.subscription.created", { customerId, subscriptionId: subscription.id });

    if (customerId) {
      // Găsește user-ul după customer_id
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("id, is_subscribed")
        .eq("stripe_customer_id", customerId)
        .single();

      // Dacă nu găsim după customer_id, încercăm să actualizăm direct dacă avem metadata
      if (!profile) {
        console.log("Profile not found by customer_id, skipping");
        return NextResponse.json({ received: true });
      }

      // Actualizează doar dacă nu e deja subscribed
      if (!profile.is_subscribed) {
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({ 
            is_subscribed: true,
            stripe_subscription_id: subscription.id
          })
          .eq("id", profile.id);

        if (error) {
          console.error("Supabase update error:", error);
        } else {
          console.log("Updated subscription from customer.subscription.created");
        }
      }
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    console.log("customer.subscription.deleted", { customerId, subscriptionId: subscription.id });

    // Găsește user-ul după customer_id
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single();

    if (profile) {
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({ 
          is_subscribed: false,
          stripe_subscription_id: null
        })
        .eq("id", profile.id);

      if (error) {
        console.error("Supabase update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
