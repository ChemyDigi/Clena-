import { NextResponse } from "next/server";

const WEBHOOK_URL =
  "https://atomator.autoloom.work/webhook-test/73e68f46-4e47-41a8-9995-39b49b37225b";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const fromDate = formData.get("fromDate");
  const toDate = formData.get("toDate");

  if (!name || !email || !fromDate || !toDate) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event: "leave_request",
      name,
      email,
      fromDate,
      toDate,
    }),
  });

  return NextResponse.json({ success: true });
}