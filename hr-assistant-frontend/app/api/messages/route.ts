import { NextResponse } from "next/server";

const WEBHOOK_URL = "https://n8n.autoloom.work/webhook-test/5fd880db-e6ec-4654-9fdc-5550c45ad19a";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "email and message are required" },
        { status: 400 }
      );
    }

    // ✅ 1. Log locally
    console.log("Incoming HR message:", { email, message });

    // ✅ 2. Send to webhook
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "hr_message_created",
        email,
        message,
      }),
    });

    // ✅ 3. Respond to frontend
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
