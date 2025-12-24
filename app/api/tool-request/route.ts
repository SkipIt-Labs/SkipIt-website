import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body?.name ?? null) as string | null;
    const email = String(body?.email ?? "").trim().toLowerCase();
    const request = String(body?.request ?? "").trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (!request || request.length < 10) {
      return NextResponse.json(
        { error: "Please describe your request in a bit more detail." },
        { status: 400 }
      );
    }
    if (request.length > 5000) {
      return NextResponse.json({ error: "Request is too long." }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("tool_requests").insert({
      name,
      email,
      request,
      source: "contact",
    });

    if (error) {
      console.error("tool-request insert error:", error);
      return NextResponse.json({ error: "Failed to save request." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("tool-request error:", err?.message || err, err);
    return NextResponse.json({ error: "Failed to save request." }, { status: 500 });
  }
}


