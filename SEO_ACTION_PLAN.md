# SEO action plan — ViralBizz

Derived from `SEO_RESEARCH.md`. Ordered by impact ÷ effort, not by category.

**Legend** — `[code]` I can do entirely in this repo · `[content]` needs copy or
client sign-off · `[you]` needs an account, a login or outreach I can't do.

---

## Phase 0 — Foundations (this week, unblocks everything)

Nothing else is worth doing until a crawler can find the site and read real
numbers off it.

- [ ] **`[code]` Ship the stats fix to the live domain.** The server currently
      renders `0M+` / `0+` / `0x` on `www.viralbizz.com`. Fix is committed as
      `1505035` but unpushed, and the live domain is served by a different
      deployment than the `viralbizz-web` Vercel project — that mismatch needs
      resolving or the fix won't land.
- [x] **`[code]` `app/robots.ts`** — allows all, disallows `/api/`, declares host
      and sitemap.
- [x] **`[code]` `app/sitemap.ts`** — all 8 routes, generated from `routes` in
      `lib/seo.ts` so a new page cannot go missing. Uses a fixed `lastmod`
      constant rather than build time, so it stays meaningful.
- [x] **`[code]` Canonical URLs** on all 8 pages, absolute, on `www`.
- [x] **`[code]` Open Graph + Twitter card metadata.** The existing `og-image` was
      1024×1024, which crops badly to 1.91:1 — clipping both the mark and the
      wordmark — so `og-cover.jpg` (1200×630) was generated from it.
- [x] **`[code]` Homepage `metadata` export.**
- [x] **`[code]` `Organization` + `WebSite` JSON-LD** in the root layout, with
      logo, `sameAs` and a sales contact point. `legalName` is deliberately
      omitted while `site.config.ts` still holds a `TODO:` placeholder — add it
      once the entity is confirmed.
- [x] **`[code]` `FAQPage` JSON-LD on `/faq`** generated from the same
      `content/faqs.ts` array the page renders, plus a `BreadcrumbList`.
- [ ] **`[you]` Verify Google Search Console**, submit the sitemap, request
      indexing for all 8 URLs. Put the token in `NEXT_PUBLIC_GSC_VERIFICATION`.
      Until this exists we are optimising blind — no query data, no coverage
      report, no way to tell whether any of this worked.
- [ ] **`[you]` Bing Webmaster Tools.** Five minutes, and it feeds Copilot and
      DuckDuckGo.

**Done when:** `robots.txt` and `sitemap.xml` return 200 on the live domain,
a LinkedIn share preview renders an image, the Rich Results Test validates both
schema blocks, and GSC shows 8 URLs submitted.

---

## Phase 1 — Stop discarding the proof we already have (week 1–2)

- [x] **`[code]` Put the person's name back on testimonials.** Name, role,
      company, client logo and a face. Both source photos are casual full-length
      snapshots, not headshots, so the avatar crops to a measured region of each
      image rather than relying on `object-position` — see `photoCrop` in
      `content/types.ts`. **Proper headshots would be a genuine upgrade here**
      and would let that whole mechanism be deleted.
- [ ] ~~**`Review` / `Organization` schema** for those testimonials~~ —
      **dropped, this was bad advice.** Google has excluded self-serving reviews
      (an Organization carrying reviews of itself on its own site) from review
      rich results since September 2019, so it earns no stars, and self-serving
      or fabricated review markup can attract a manual action. Displaying
      testimonials as ordinary HTML — which is what we now do — is explicitly
      fine. Review markup only becomes available if we ever mark up a distinct
      product, not the agency itself.
- [ ] **`[content]` Un-ship the draft copy.** The DRAFT badge is live on `/work`
      and "TODO: confirm with legal" renders on `/privacy` and `/terms`. Thin,
      visibly-unfinished legal pages are a quality signal working against us.
- [ ] **`[you]` Directory listings — the fastest real win available.** Each is a
      citation, usually a link, and sits on pages that already rank for the head
      terms we can't: Clutch, DesignRush, Business of Apps marketplace,
      influencermarketinghub, G2, Upwork agency profile. Also claim the Google
      Business Profile and the LinkedIn company page.
- [ ] **`[you]` Add the two missing socials.** `site.config.ts` has `instagram`
      and `tiktok` as `null`. A TikTok agency with no linked TikTok profile is a
      credibility problem before it's an SEO one, and both belong in `sameAs`.

---

## Phase 2 — Build the pages that can actually rank (week 2–6)

### 2a. Case study pages — the single biggest win

- [x] **`[code]` Deleted the `/work/:slug` → `/work` redirect** and built real
      detail pages at `/work/[slug]`, rendering every field that already
      existed in `content/caseStudies.ts`.
- [x] **`[code]` Draft gate.** A study whose copy still contains `TODO:` is
      `noindex, follow` and is kept out of the sitemap. The gate reads the
      content itself, so stripping the TODO prefixes publishes the page with no
      code change. **All four are currently gated.**
- [x] **`[code]` Fixed a soft 404.** Unknown slugs returned HTTP 200 with
      "This page could not be found" on first request — partial prefetching
      serves the fallback before `notFound()` runs — and only 404'd on later
      cached hits. `ensureStatic: "navigation"` makes the first request wait
      for the full render. (`dynamicParams: false`, the usual answer, fails the
      build under Cache Components.)
- [ ] **`[content]` Confirm the narrative copy with clients.** Blocked on
      `CONTENT_TODO.md`: one-liner, challenge, what we did, formats and posting
      strategy for Glowup, RAYZ, Shoppin and Chef AI. **This is the critical path
      — the engineering is a day, the sign-off is the bottleneck.**
- [x] **`[code]` `Article` + `BreadcrumbList` schema** per page. `image` is
      deliberately omitted — the only per-study images we hold are small client
      logos, and attaching the generic brand card to all four would describe
      none of them. The video stills below are what unlock the rich result.
- [ ] **`[content]` Video embeds or stills.** Four top videos per study, also
      tracked in `CONTENT_TODO.md`.

Target shape: `/work/glowup` — "How Glowup hit 500M+ TikTok views with faceless
content". Real numbers, named client, the testimonial inline, internal links to
the service pages used.

### 2b. Split the services apart

- [ ] **`[code]` Give each of the four services its own URL.** They're currently
      anchors on one page, so four distinct buyer intents compete for one
      position. `/services/faceless-tiktok-video-creation`,
      `/services/ugc-reaction-content`, `/services/tiktok-account-growth`,
      `/services/creative-strategy`. Keep `/services` as the hub.
- [ ] **`[code]` `Service` schema** on each.
- [ ] **`[content]` Expand each to 800–1,200 words.** Competitors run 1,800–2,300.
      The existing three-bullet summaries will not compete.

### 2c. Internal linking

- [x] **`[code]` Case studies are linked from everywhere they should be** —
      the `/work` index, the featured card, and the homepage results grid, and
      each study cross-links to the other three. The site now links 12 unique
      internal URLs, up from 8.
- [ ] **`[content]` Map services to case studies.** Each study should link to
      the services it actually used — the strongest internal link we are still
      missing. There is no such mapping in the data and inventing one would be
      fabrication, so it needs a line per study from someone who ran the work.

---

## Phase 3 — Content that wins long-tail (month 2–3)

Only start this if someone owns publishing. Four abandoned posts are worse than
none.

Each of these is evidenced — lifted from a competitor's H2s, FAQ or slugs, so we
know someone already judged the query worth targeting. Write one properly before
writing six badly.

- [ ] **`[content]` "What an organic TikTok agency actually costs for an app"** —
      research found *no* published rate for organic-only app work. We don't have
      to publish our prices to own the question; explain what drives cost
      (posting volume, account count, formats, localisation) and send the buyer
      to a call. Genuine gap, directly on-positioning.
- [ ] **`[content]` "How many TikTok posts a month does an app actually need?"**
- [ ] **`[content]` "How to measure organic TikTok installs"** — attribution here
      is genuinely hard and the existing answers are weak. Strongest expertise
      signal on the list.
- [ ] **`[content]` "Fresh accounts vs. creator accounts for app growth"**
- [ ] **`[content]` "Organic TikTok vs. TikTok ads for apps"** — high commercial
      intent, catches people mid-decision.
- [ ] **`[content]` "TikTok account warming, and running multiple accounts"** —
      we already sell multi-account growth; this is our actual expertise.
- [ ] **`[content]` Our own comparison page** — "Best organic TikTok agencies for
      apps". Standard practice in this category (Agniverse's top asset is exactly
      this, with themselves at #1). Be honest about method and include
      competitors we respect, or it's worthless.

Vertical pages — only where we have a real case study to anchor them, otherwise
they're thin:

- [ ] **`[content]` TikTok marketing for beauty apps** (anchor: Glowup, 500M+)
- [ ] **`[content]` TikTok marketing for shopping apps** (anchor: Shoppin)
- [ ] **`[content]` TikTok marketing for AI apps** (anchor: Chef AI)

---

## Phase 4 — Measure (ongoing, starts with Phase 0)

- [ ] **`[you]` GA4 + Search Console linked.** `NEXT_PUBLIC_GA_MEASUREMENT_ID` is
      empty.
- [ ] **`[code]` Cookie consent before any pixel fires.** GA4 and TikTok Pixel are
      both planned and we have an EU audience. Already flagged in
      `CONTENT_TODO.md` as Phase 5 — it needs to land *with* analytics, not after.
- [ ] **`[you]` Baseline the numbers now** so there's something to compare
      against: impressions, clicks, average position, indexed page count.
- [ ] **`[you]` Authorise Ahrefs via `/mcp`** if you want the priorities in this
      plan re-sorted against real search volume and difficulty. Everything here
      is currently ordered on SERP composition and competitor behaviour, which is
      sound but not the same as volume data.

---

## Deliberately not doing

- **Chasing "TikTok marketing agency"** — listicle-owned, zero chance from a
  standing start. That's a directory-listing problem (Phase 1), not a content one.
- **Near-duplicate programmatic pages** — TokPortal runs six variants of one
  phrase. At our authority that reads as thin content and risks the domain.
- **Publishing numbers we can't source.** The four case studies sum to ~567M
  views against a site-wide "700M+". Reconcile that before pushing either harder.

---

## Sequencing

```
Week 1    Phase 0 (code)          ← I can do this now
          GSC + directories       ← you, in parallel
Week 2    Phase 1
Week 3-6  Phase 2  ← gated on client sign-off for case study copy
Month 2-3 Phase 3  ← gated on someone owning publishing
```

Phase 0 is mechanical and I can start immediately. Phase 2 is where the real
ranking gains are, and its critical path runs through client approvals in
`CONTENT_TODO.md`, not through code — worth starting those conversations this
week so the pages aren't waiting on them.
