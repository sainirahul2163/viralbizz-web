import type { CaseStudy } from "@/content/types";

export function draftCopy(text: string) {
  const isDraft = /^\s*TODO:/i.test(text);
  const display = text
    .replace(/^\s*TODO:\s*confirm with client\s*[—–-]\s*/i, "")
    .replace(/^\s*TODO:\s*/i, "")
    .trim();

  return { isDraft, display };
}

/**
 * True while any of a case study's narrative copy is still an unconfirmed
 * placeholder (see CONTENT_TODO.md).
 *
 * This drives whether the page is indexable and whether it appears in the
 * sitemap, so the gate is the content itself rather than a flag someone has to
 * remember to flip: strip the `TODO:` prefixes in content/caseStudies.ts and
 * the page goes live to search engines with no code change.
 */
export function isDraftCaseStudy(study: CaseStudy) {
  return [
    study.oneLiner,
    study.challenge,
    study.whatWeDid,
    study.postingStrategy,
    ...study.formats,
  ].some((text) => draftCopy(text).isDraft);
}
