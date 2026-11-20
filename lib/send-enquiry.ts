import { Resend } from "resend";
import {
  enquiryHtml,
  enquirySubject,
  enquiryText,
  type ContactInput,
} from "@/lib/contact";

type DeliverResult = { ok: true } | { ok: false; error: string };

export async function deliverEnquiry(
  input: ContactInput,
  request: Request,
): Promise<DeliverResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "admin@viralbizz.com";
  const cc = process.env.CONTACT_CC_EMAIL ?? "rahul@viralbizz.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "ViralBizz <noreply@viralbizz.com>";

  if (apiKey) {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      cc: [cc],
      replyTo: input.email,
      subject: enquirySubject(input),
      text: enquiryText(input),
      html: enquiryHtml(input),
    });
    if (!error) return { ok: true };
    console.error("Resend error", error);
  }

  const fallback = await sendViaFormSubmit(input, to, cc, request);
  if (fallback.ok) return fallback;

  return {
    ok: false,
    error: "Couldn’t send just now. Email us and we’ll pick it up.",
  };
}

async function sendViaFormSubmit(
  input: ContactInput,
  to: string,
  cc: string,
  request: Request,
): Promise<DeliverResult> {
  const origin =
    request.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: `${origin}/contact`,
        "User-Agent":
          request.headers.get("user-agent") || "ViralBizz Contact Form",
      },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        _replyto: input.email,
        _subject: enquirySubject(input),
        _template: "table",
        _cc: cc,
        _captcha: "false",
        app: input.appName,
        role: input.role,
        source: input.source,
        message: input.message,
      }),
    },
  );

  const payload = (await response.json().catch(() => null)) as {
    success?: string | boolean;
    message?: string;
  } | null;

  const succeeded =
    response.ok &&
    (payload?.success === true ||
      payload?.success === "true" ||
      /success|confirm|activat/i.test(payload?.message ?? ""));

  if (succeeded) return { ok: true };

  console.error("FormSubmit error", response.status, payload);
  return { ok: false, error: "FormSubmit failed" };
}
