export function draftCopy(text: string) {
  const isDraft = /^\s*TODO:/i.test(text);
  const display = text
    .replace(/^\s*TODO:\s*confirm with client\s*[—–-]\s*/i, "")
    .replace(/^\s*TODO:\s*/i, "")
    .trim();

  return { isDraft, display };
}
