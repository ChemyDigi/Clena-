import { NextResponse } from "next/server";
import { messages } from "../../store";

export async function POST(req: Request) {
  let body;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { message, sessionId } = body;

  if (!message || !sessionId) {
    return NextResponse.json(
      { error: "message and sessionId are required" },
      { status: 400 }
    );
  }

  messages.push({
    sessionId,
    message,
  });

  console.log("✅ HR reply stored:", message);

  return NextResponse.json({ success: true });
}
