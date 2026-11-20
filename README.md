# ViralBizz

Marketing site for [ViralBizz](https://www.viralbizz.com) — a TikTok-first organic growth agency for apps.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion

Content lives in `/content`. Site-wide copy, emails, and socials live in `site.config.ts`. Adding a case study means one object in `content/caseStudies.ts` plus images in `/public`.

## Env

See `.env.example`. The contact form emails `admin@viralbizz.com` (CC `rahul@viralbizz.com`). With `RESEND_API_KEY` it sends through Resend from `noreply@viralbizz.com` (verify the domain in Resend). Until that key is set, the same inboxes get the enquiry via FormSubmit — confirm FormSubmit’s first activation email. Calendly, GA4, TikTok Pixel, and Search Console IDs stay optional.

## Deploy

Vercel, domain `viralbizz.com`. Full deploy steps in a later phase.
