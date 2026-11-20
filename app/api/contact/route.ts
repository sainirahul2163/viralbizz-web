import { NextResponse } from "next/server";
import { contactSchema, isLikelyBot } from "@/lib/contact";
import { deliverEnquiry } from "@/lib/send-enquiry";

const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function tooMany(ip: string) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= 5) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Check the form and try again." },
      { status: 400 },
    );
  }

  const ip = clientIp(request);
  if (tooMany(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Email us directly instead." },
      { status: 429 },
    );
  }

  if (isLikelyBot(parsed.data)) {
    return NextResponse.json({ ok: true });
  }

  const result = await deliverEnquiry(parsed.data, request);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
