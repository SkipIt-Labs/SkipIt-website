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
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Obține subscription_id din profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("stripe_subscription_id")
      .eq("id", userId)
      .single();

    if (profileError || !profile?.stripe_subscription_id) {
      return NextResponse.json({ error: "No subscription found" }, { status: 400 });
    }

    // Anulează subscription în Stripe
    await stripe.subscriptions.cancel(profile.stripe_subscription_id);

    // Actualizează în baza de date
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ 
        is_subscribed: false, 
        stripe_subscription_id: null 
      })
      .eq("id", userId);

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Cancel subscription error:", err);
    return NextResponse.json({ error: err.message || "Failed to cancel subscription" }, { status: 500 });
  }
}

