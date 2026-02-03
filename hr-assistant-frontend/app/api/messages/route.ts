import { NextResponse } from "next/server";
import { messages, HRMessage } from "../store";

const WEBHOOK_URL =
  "https://n8n.autoloom.work/webhook-test/5fd880db-e6ec-4654-9fdc-5550c45ad19a";


export async function POST(req: Request) {
  try {
    const body = (await req.json()) as HRMessage;
    const { email, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "email and message are required" },
        { status: 400 }
      );
    }

    messages.push({ email, message });
    console.log("✅ Message stored:", { email, message });

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
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ POST error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(messages);
}
