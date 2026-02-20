import { NextResponse } from "next/server";
import { messages, HRMessage } from "../store";

const WEBHOOK_URL =
  "https://atomator.autoloom.work/webhook-test/2ce4fb75-5d16-4834-98fc-294d516908fa";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as HRMessage;

    // 🔥 ADDED sessionId
    const { sessionId, email, message } = body;

    if (!sessionId || !email || !message) {
      return NextResponse.json(
        { error: "sessionId, email and message are required" },
        { status: 400 }
      );
    }

    // 🔥 store with sessionId
    messages.push({ sessionId, email, message });

    console.log("✅ Message stored:", { sessionId, email, message });

    // 🔥 forward sessionId to webhook
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "hr_message_created",
        sessionId, // 🔥 ADDED
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

// 🔥 UPDATED GET to filter by session
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json([]);
  }

  const sessionMessages = messages.filter(
    (msg) => msg.sessionId === sessionId
  );

  return NextResponse.json(sessionMessages);
}