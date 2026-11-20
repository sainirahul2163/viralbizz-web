# SEO research — ViralBizz

Researched 20 November 2026. Every claim below is either something I measured
against a live URL or something I read on a competitor's page. Where I don't
have data, I say so rather than estimating.

**What I could not measure:** search volume, keyword difficulty scores, competitor
traffic, and backlink counts. Those need Ahrefs, Semrush or SimilarWeb. The Ahrefs
and SimilarWeb connectors exist in this workspace but are not authorised, so every
volume figure in this document is absent on purpose. Nothing here is an invented
number. Authorising Ahrefs via `/mcp` would let the priority order in
`SEO_ACTION_PLAN.md` be re-sorted against real volume.

---

## 1. Baseline: where we actually stand

`www.viralbizz.com` is live and serving this codebase. The apex redirects
correctly (`viralbizz.com` → 308 → `www.viralbizz.com`). That is the only piece
of SEO infrastructure currently working.

Measured against the live site on 20 Nov 2026:

| Check | Result |
|---|---|
| `robots.txt` | **404** |
| `sitemap.xml` | **404** |
| `og:` / `twitter:` / `canonical` tags | **0 across the entire document** |
| Structured data (JSON-LD) | **none anywhere in the codebase** |
| Indexable pages | **8** |
| Unique internal links from the homepage | **7** |
| Headline social proof in server HTML | **`0M+`, `0M+`, `0+`, `0+`, `0x`** |

The last row is the one to sit with. The stats band is the site's primary
credibility asset — 700M+ views, 1,000+ videos — and the server ships zeros. The
real numbers only appear after JavaScript runs the count-up animation. Anything
that reads HTML without executing JS sees an agency advertising zero results.
That includes a large share of crawlers, every link-preview bot, and the
retrieval layer behind LLM answers. A fix is committed locally but is not yet on
the domain.

**We do not rank for our own brand name.** A web search for
`viralbizz.com ViralBizz TikTok agency` returns results for Viral Nation, VIRAL
Insider and Viral Vibes — and nothing for us. Not the homepage, not any page.
For a live domain this is the signal that matters: we are not meaningfully in
the index. Everything else in this document is secondary to fixing that.

---

## 2. The competitive set

The agencies that show up for "TikTok marketing agency for apps" split into three
groups, and only one of them is actually our competition.

**Paid-media app agencies — not our fight.** Admiral Media, Moburst, Udonis,
Favoured, Disrupt, REPLUG. These sell TikTok *ads* and app UA. Different service,
different buyer, different intent behind the query. We should not write content
aimed at beating them.

**Aggregators and listicles — these own the head terms.** Business of Apps
marketplace, influencermarketinghub.com, webtonic.io, stackmatix.com,
designrush.com, Clutch, Upwork. Searching the head term returns *their* pages, not
agency homepages. This is the single most important structural fact in this
document, and §3 deals with its consequences.

**Direct competitors — organic TikTok for apps.** Three worth studying closely,
because they are doing exactly what we do and are visible while we are not.

### Agniverse (agniverse.co)

The most sophisticated SEO operator in our niche. Their flagship page,
`/best-organic-tiktok-agencies-for-apps`, is a ~2,300-word buyer's guide in which
they rank themselves first out of six agencies. H1: "The best organic TikTok
agencies for apps."

What makes it work:

- **13 H2s written as the questions buyers actually type** — "How many TikTok
  posts a month does an app need?", "Fresh accounts or the creator's own
  accounts?", "How to tell whether organic TikTok is working".
- **A 10-pair FAQ** including "How much does an organic TikTok agency cost?"
- **One case study carrying specific, falsifiable numbers** — Flamme: 53M organic
  views, 200K users, $0 paid, monthly views from 0.4M in July to 19.8M in
  December, "8 of 34 hooks drove over 85%", day-30 retention 0.8% → 50%+.
- **~80 unique internal links** from that single page.
- **Repeatable slug clusters**: `best-ugc-agencies-for-[vertical]` (~10),
  `best-ugc-agencies-[region]` (~14), `[x]-alternatives`, `[x]-vs-[y]`, plus
  around 8 AI-search guides and a blog.

### The Viral App (theviralapp.com)

A homepage-led brand play — only ~1,000 words, thin on prose, extremely heavy on
proof. Claims 3B+ views, 10,000+ creators, 35+ apps.

The part we should copy is the **`/portfolio/[client]/` pattern**: roughly ten
individual client pages, each with hard numbers. Clicked 26.9M views / 2,000+
videos / 15 creators. Stimuler 166M+ views, top video 34.3M. Cal AI $30M+ ARR,
1.5B+ views. VibeCode $0 → $1.3M ARR in 2.5 months.

### TokPortal (tokportal.com)

A software vendor, not an agency, but the clearest example of **programmatic
long-tail**. Hubs at `/verticals/`, `/use-cases/`, `/learn/`, `/vs/`, `/country/`
and `/integrations/`. Their page `/verticals/tiktok-organic-app-install-strategy`
is ~1,800 words with six tactical H2s and a five-question FAQ, and they run
several near-duplicate pages across slight query variations. They substitute
platform-level benchmarks for client case studies — a first-party study of 9,000+
TikTok profiles with engagement by follower tier (6.2% / 4.8% / 3.5% / 2.2%).

---

## 3. The strategic read

### 3.1 Stop trying to rank for the head terms

"TikTok marketing agency", "TikTok agency for apps" and their variants return
listicles from domains with years of authority. A site with 8 pages, no backlinks
and no brand presence in the index will not displace Business of Apps. Writing a
page called "TikTok Marketing Agency for Apps" and waiting is the default move and
it will not work.

The head terms are a **distribution problem, not a ranking problem**. The way to
appear for them is to be *listed in* the pages that already rank: Clutch,
DesignRush, Business of Apps marketplace, influencermarketinghub, G2. Each listing
is a citation, usually a link, and a referral path. That work belongs in outreach,
not in content.

### 3.2 Publish our own comparison page

Agniverse's most valuable asset is a listicle in which they place themselves
first. This is standard practice in the category and it is how buyer-intent
traffic gets captured by a participant rather than a publisher. We should have the
equivalent — honest about method, genuinely useful, and including competitors we
respect.

### 3.3 The case study pages we deleted

**This is the largest and cheapest opportunity on the list.**

`next.config.ts` currently contains:

```ts
{ source: "/work/:slug", destination: "/work", permanent: true }
```

Every case study URL 308s away to a single index page. Meanwhile
`content/caseStudies.ts` already holds, for all four clients, the exact fields
those pages need: `oneLiner`, `challenge`, `whatWeDid`, `formats`,
`postingStrategy`, `videos`, `topVideos`, `avgEngagementRate`, `testimonialId`.
The data model was built for detail pages that were then blocked at the router.

Our numbers are competitive with anything in §2 — Glowup 500M+ views with a 15M
top video, RAYZ 50M+ with 25% average engagement, Shoppin 10M+ at 17%, Chef AI
7M+ at 15%. The Viral App built its entire organic footprint on this page type.
We have the content and are serving a redirect.

The blocker is honest: most of that narrative copy is still `TODO: confirm with
client` placeholder text, tracked in `CONTENT_TODO.md`. Shipping those pages
requires the client sign-off, not more engineering.

### 3.4 Where a zero-authority site can actually win

Informational long-tail, where the competition is other vendors' marketing pages
rather than high-authority publishers. These queries are evidenced — each one is
lifted from a competitor's H2s, FAQ entries or slugs, so we know someone has
already judged them worth targeting:

- How much does app UGC / an organic TikTok agency cost
- How many TikTok posts a month does an app need
- TikTok account warming, and warming multiple accounts
- Fresh accounts vs. the creator's own accounts
- How to measure organic TikTok installs (attribution is genuinely hard and the
  existing answers are weak)
- TikTok slideshows for apps
- Multi-country / localised TikTok app launches
- Organic TikTok vs. TikTok ads for apps

### 3.5 Pricing: a gap worth owning

Researching agency pricing turned up no published rate for organic-only TikTok
work for apps. Everyone hides it behind a call. The general ranges that exist
come from agency-written blogs, are inconsistent, and are mostly about paid media.

Our site deliberately publishes no prices — "no prices on this site, on purpose" —
and that positioning is fine. But refusing to publish a *rate* is different from
refusing to answer the *question*. A page explaining what actually drives cost
(posting volume, number of accounts, formats, localisation) would own a real
query, demonstrate expertise, and still send the buyer to a call. Right now the
query is answered by people guessing.

### 3.6 Being citable by AI

Agniverse runs roughly eight dedicated AI-search guides. The practical point: when
someone asks an assistant for the best organic TikTok agency for apps today, it
has our competitors' pages to draw on and effectively nothing of ours. The things
that make a page quotable overlap almost entirely with the things that make it
rank — explicit question-shaped headings, specific numbers attached to named
clients, named people with real roles, and structured data that states plainly
what the organisation is. All of that is in §4.

---

## 4. Our own gaps, ranked by cost to fix

**Free, and blocking everything else:**

1. No `robots.txt`, no `sitemap.xml`. Nothing is telling a crawler what exists.
2. No canonical tags. With `www` and apex both resolving, this is a real
   duplication risk even though the redirect is correct today.
3. No Open Graph or Twitter tags. Every share of this site on LinkedIn or X — the
   two socials in the footer — renders as a bare text stub. `og-image.jpg` and
   `og-image.webp` are already sitting in `public/images/brand/`, referenced by
   nothing.
4. No structured data. No `Organization`, no `FAQPage` despite having eight
   genuine Q&A pairs in `content/faqs.ts`, no `Service`, no `BreadcrumbList`.
5. No Google Search Console verification. `NEXT_PUBLIC_GSC_VERIFICATION` is empty,
   so we have no visibility into impressions, queries or coverage. We are
   optimising blind.
6. The homepage has no `metadata` export and inherits the layout default, so its
   title and description are not tuned for its own target query.
7. Stats render as zeros server-side (§1).

**Cheap, and high-leverage:**

8. Testimonials render as "Founder, Glowup" with the person's name omitted —
   while `content/testimonials.ts` contains "Louis-David Paul-Hus" and "Shlok",
   and both headshots sit unused in `public/images/testimonials/`. Named,
   photographed clients are a direct experience and trust signal, and we are
   discarding ours.
9. Services exist only as anchors on one page (`/services#faceless-tiktok-video-creation`).
   Four services with distinct buyer intent share a single URL, so they compete
   with each other instead of each owning a query.
10. Only 8 pages and 7 internal links. Agniverse runs ~80 internal links from one
    page. There is almost no surface here to rank.

**Needs client sign-off, not code:**

11. Case study pages (§3.3) — blocked on confirming the narrative copy.
12. Draft placeholder text is live: the DRAFT badge on `/work`, and
    "TODO: confirm with legal" rendered on `/privacy` and `/terms`. A thin,
    obviously-unfinished legal page is a quality signal working against us.

---

## 5. What I would not do

- **Don't chase "TikTok marketing agency".** §3.1. The effort belongs in directory
  listings and outreach.
- **Don't build TokPortal-style near-duplicate pages.** They run six pages across
  variants of one phrase. It appears to work for them at their authority level;
  from zero it reads as thin content and risks the whole domain.
- **Don't add a blog with no publishing commitment.** An abandoned blog with four
  posts from 2026 is worse than no blog. Only open this if someone owns it.
- **Don't publish invented metrics to look bigger.** The site already carries
  "15M+ installs influenced" and "7x average ROI" with no stated source, and
  `/terms` disclaims them as historical. Case-study numbers are our strongest
  asset precisely because they are specific and attributable. Keep that line
  clean — the four case-study totals sum to ~567M, while the site-wide figure is
  700M+, and that gap should be explainable before either number is pushed harder.

---

## 6. Honest assessment of timeline

No credible version of this produces rankings for competitive commercial terms in
weeks. From a standing start:

- **Days** — technical foundations (§4 items 1–7). Indexation becomes possible;
  shares stop looking broken.
- **2–6 weeks** — brand search. We should rank first for "ViralBizz" and
  "viralbizz" once the site is crawlable and has a handful of citations. We do not
  today.
- **1–3 months** — informational long-tail (§3.4), if the content is genuinely
  better than the vendor pages currently answering those queries.
- **3–6 months+** — niche commercial terms like "organic TikTok agency for apps",
  and only with links. Content alone will not get there.
- **Directory listings** are the fastest real-world win and are outreach, not
  engineering. They can start today, in parallel with everything above.

The honest summary: our technical foundation is missing but trivially fixable, our
proof assets are strong but either blocked by a redirect or rendering as zeros,
and our content surface is roughly a tenth of the nearest competitor's. The first
two are solvable this week. The third is a quarter of consistent work.

---

## Sources

- [Business of Apps — Top TikTok Marketing Agencies (2026)](https://www.businessofapps.com/marketplace/tiktok/)
- [Agniverse — Best TikTok Marketing Agencies for Apps (Organic, 2026)](https://agniverse.co/best-organic-tiktok-agencies-for-apps)
- [The Viral App](https://theviralapp.com/)
- [TokPortal — TikTok Organic App Install Strategy for Apps](https://www.tokportal.com/verticals/tiktok-organic-app-install-strategy)
- [TokPortal — TikTok Multi-Account Posting Without Reach Drops](https://www.tokportal.com/learn/tiktok-multi-account-posting-without-throttling)
- [Admiral Media — TikTok Ads Agency for Apps and Games](https://admiral.media/tiktok-ads-agency/)
- [influencermarketinghub — Top TikTok Marketing Agencies](https://influencermarketinghub.com/top-tiktok-marketing-agencies/)
- [webtonic.io — The 50 Top TikTok Marketing Agencies](https://www.webtonic.io/blog/top-tiktok-marketing-agencies)
- [Stackmatix — Best TikTok Marketing Agencies 2026: Ranked with Pricing](https://www.stackmatix.com/blog/best-tiktok-marketing-agencies-2026)
- [amworldgroup — TikTok Marketing Cost (2026)](https://amworldgroup.com/pricing/tiktok-marketing-cost)
- [Multilogin — How to Warm Up a TikTok Account](https://multilogin.com/blog/how-to-warm-up-tiktok-account/)
