import { NextResponse } from "next/server";
import { messages, HRMessage } from "../store";

const WEBHOOK_URL =
  "https://atomator.autoloom.work/webhook-test/2ce4fb75-5d16-4834-98fc-294d516908fa";


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
