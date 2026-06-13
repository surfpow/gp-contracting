/**
 * Renders a structured-data payload as a `<script type="application/ld+json">`
 * tag, following Next.js's recommended approach. `<` is escaped to its unicode
 * equivalent to guard against XSS via injected strings.
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
