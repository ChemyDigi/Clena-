import { NextResponse } from "next/server";
import { messages } from "../store";

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

  const { message } = body;

  if (!message) {
    return NextResponse.json(
      { error: "message is required" },
      { status: 400 }
    );
  }

  messages.push({
    message,
  });

  console.log("✅ HR reply stored:", message);

  return NextResponse.json({ success: true });
}
