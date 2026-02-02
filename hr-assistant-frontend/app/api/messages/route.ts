import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, message } = body;

    // Basic validation
    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: "email and message are required" },
        { status: 400 }
      );
    }

    // ✅ For now: just log it (this is your backend receiving JSON)
    console.log("✅ Incoming HR message:", { email, message });

    // Return success response
    return NextResponse.json(
      { success: true, data: { email, message } },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 500 }
    );
  }
}
