import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { plan, email, userId } = await req.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }

    // Server-side guard: block duplicate purchases
    if (userId) {
      const { data: profile, error: profErr } = await supabaseAdmin
        .from("profiles")
        .select("is_subscribed")
        .eq("id", userId)
        .single();

      if (profErr) {
        console.error("Profile lookup error:", profErr);
      } else if (profile?.is_subscribed) {
        return NextResponse.json(
          { error: "You already have an active subscription." },
          { status: 409 }
        );
      }
    }

    const priceId =
      plan === "yearly"
        ? process.env.STRIPE_PRICE_ID_YEARLY
        : process.env.STRIPE_PRICE_ID_MONTHLY;

    if (!priceId) {
      return NextResponse.json(
        { error: `Missing price id for plan: ${plan}` },
        { status: 500 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/tools?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing`,
      metadata: { userId, plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Checkout error:", err?.message || err, err);
    return NextResponse.json(
      { error: err?.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
