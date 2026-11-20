/**
 * Renders a JSON-LD block.
 *
 * `<` is escaped to its unicode form because JSON.stringify does not sanitise
 * strings for embedding in HTML — without it, content containing `</script>`
 * would break out of the tag. Our schema is built from local content files, but
 * the escape costs nothing and the failure mode is XSS.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
