import { NextResponse } from "next/server";
import { messages } from "../../store";

export async function POST() {
  messages.length = 0; // 🔥 CLEAR ALL MESSAGES

  console.log("🧹 All messages cleared");

  return NextResponse.json({ success: true });
}
