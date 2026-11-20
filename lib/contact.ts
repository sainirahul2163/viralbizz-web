import { z } from "zod";
import { siteConfig } from "@/site.config";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.email("Enter a valid email").max(120),
  appName: z.string().trim().min(2, "Enter the app name").max(80),
  role: z.enum(siteConfig.contact.roles, {
    error: "Pick a role",
  }),
  source: z.enum(siteConfig.contact.sources, {
    error: "Tell us how you found us",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Give us a little more detail (20+ characters)")
    .max(2000),
  website: z.string().max(200).optional(),
  startedAt: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function isLikelyBot(input: ContactInput) {
  if (input.website?.trim()) return true;
  if (
    process.env.NODE_ENV === "production" &&
    input.startedAt &&
    Date.now() - input.startedAt < 2500
  ) {
    return true;
  }
  return false;
}

export function enquirySubject(input: ContactInput) {
  return `TikTok enquiry: ${input.appName}`;
}

export function enquiryText(input: ContactInput) {
  return [
    "New TikTok growth enquiry from viralbizz.com",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `App: ${input.appName}`,
    `Role: ${input.role}`,
    `Found us via: ${input.source}`,
    "",
    "Message:",
    input.message,
  ].join("\n");
}

export function enquiryHtml(input: ContactInput) {
  const rows = [
    ["Name", input.name],
    ["Email", input.email],
    ["App", input.appName],
    ["Role", input.role],
    ["Found us via", input.source],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#737373;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;color:#111">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Inter,system-ui,sans-serif;font-size:15px;line-height:1.5;color:#111">
      <p style="margin:0 0 16px">New TikTok growth enquiry from viralbizz.com</p>
      <table style="border-collapse:collapse">${rows}</table>
      <p style="margin:20px 0 8px;color:#737373">Message</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(input.message)}</p>
    </div>
  `;
}
