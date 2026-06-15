import { NextResponse } from "next/server";

import {
  SITE_SUBMISSION_WEBHOOK_URL,
  type SiteSubmissionPayload,
} from "@/lib/site-submission";

export async function POST(request: Request) {
  let payload: SiteSubmissionPayload;

  try {
    payload = (await request.json()) as SiteSubmissionPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { firstName, lastName, phone, email, service, source } = payload;

  if (!firstName || !lastName || !phone || !email || !service || !source) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const response = await fetch(SITE_SUBMISSION_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Unable to submit your request right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
