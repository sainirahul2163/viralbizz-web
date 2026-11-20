# Content TODOs

Items that must be confirmed before launch. Never invent numbers to fill these.

## Missing URLs
- [ ] Instagram profile URL (`site.config.ts` → `socials.instagram`)
- [ ] TikTok profile URL (`site.config.ts` → `socials.tiktok`)
- [ ] Calendly URL (`NEXT_PUBLIC_CALENDLY_URL`)

## Legal
- [ ] Legal entity name
- [ ] Registered address
- [ ] Governing law / jurisdiction
- [ ] Lawyer review of `/privacy` and `/terms`

## Case study narrative (drafts are in `content/caseStudies.ts`)
- [ ] Glowup one-liner, challenge, what we did, formats, posting strategy
- [ ] RAYZ one-liner (what the app is), challenge, what we did, formats, posting strategy
- [ ] Shoppin one-liner, challenge, what we did, formats, posting strategy
- [ ] Chef AI one-liner, challenge, what we did, formats, posting strategy
- [ ] Glowup: only one top-video number (`15M`). Confirm whether three more view counts exist.

## Media
- [ ] TikTok MP4s or embed URLs for the 4 top videos on each case study
- [ ] Glowup has no video stills in the old assets
- [ ] Confirm whether to crop stills from the old RAYZ / Shoppin / Chef AI covers as temporary posters

## Analytics
- [ ] GA4 measurement ID
- [ ] TikTok Pixel ID
- [ ] Google Search Console verification code
- [ ] Cookie / consent copy (EU audience)

## Defaults currently in the build
- Growth charts: stylized unlabeled upward curve (no fake monthly numbers)
- Contact notify: Resend to `admin@viralbizz.com`, CC `rahul@viralbizz.com` when `RESEND_API_KEY` is set. Until then, FormSubmit delivers to the same inboxes — confirm the first “Activate Form” email to `admin@viralbizz.com`
- Cookie banner: planned for Phase 5, pixels will not fire without IDs
- Misc stock photos from the old site: not used
