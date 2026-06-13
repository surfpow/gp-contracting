import { JsonLd } from "@/components/json-ld";
import { buildLocalBusinessSchema } from "@/lib/service-schema";

/**
 * Site-wide LocalBusiness structured data. Rendered exactly once from the root
 * layout — intentionally NOT included on individual service pages.
 */
export function LocalBusinessJsonLd() {
  return <JsonLd data={buildLocalBusinessSchema()} />;
}
