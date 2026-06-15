export async function GET() {
  const content = `# GP Contracting Group

> Family-owned general contracting company delivering residential, commercial, tenant improvement, and specialized construction across Greater Vancouver, Vancouver Island, and the Fraser Valley. Based in Richmond, BC. Every project held to one standard — from a single room renovation to a ground-up commercial build.

GP Contracting Group was founded on a family legacy of doing what is right. We bring a disciplined pre-construction process, dedicated project management, and accountable craftsmanship to every project we take on. We serve homeowners, real estate investors, franchise operators, and commercial property owners across British Columbia.

## Services — Residential

- [Custom Home Construction](https://gp-contracting.vercel.app/services/residential/custom-home-construction): Ground-up custom homes designed and built with architectural collaboration, premium materials, and modern performance standards across Greater Vancouver and Vancouver Island.
- [Home Renovations](https://gp-contracting.vercel.app/services/residential/home-renovations): Kitchen renovations, bathroom upgrades, whole-home transformations, and structural work including additions. Serving Vancouver, Burnaby, North Vancouver, Surrey, New Westminster, and the wider Lower Mainland.
- [Multi-Family Development](https://gp-contracting.vercel.app/services/residential/multi-family-development): Duplexes, townhouse complexes, and low-rise developments built for rental income, long-term durability, and lasting property value. Serving Richmond, Langley, and throughout Greater Vancouver and the Fraser Valley.

## Services — Commercial

- [Commercial Construction](https://gp-contracting.vercel.app/services/commercial/commercial-construction): Ground-up commercial construction and interior build-outs for offices, retail spaces, mixed-use buildings, and industrial facilities. Completed fast-tracked commercial builds in under 60 days from permit to open doors for major franchise operators in British Columbia.
- [Restaurant and Bar Construction](https://gp-contracting.vercel.app/services/commercial/restaurant-bar-construction): Purpose-built hospitality environments for franchise operators and independent restaurants. Expertise in commercial kitchen layouts, Type 1 and Type 2 hood systems, grease interceptors, and health authority compliance. Repeat clients across British Columbia.

## Services — Specialized

- [Structural and Building Envelope](https://gp-contracting.vercel.app/services/specialized/structural-building-envelope): Roofing systems and structural steel framing with engineered approvals and disciplined installation. Roofing spans residential and commercial including asphalt shingle, metal, torch-on, TPO, and modified bitumen. Structural steel includes seismic compliance and engineer-approved connections.
- [Building Systems Upgrades](https://gp-contracting.vercel.app/services/specialized/building-systems-upgrades): Suspended acoustic ceiling systems (T-bar) and electrical infrastructure upgrades including EV charger installation, panel upgrades, and load assessments for residential and commercial properties.
- [Accessibility and Outdoor Living](https://gp-contracting.vercel.app/services/specialized/accessibility-outdoor-living): Accessibility renovations including wheelchair ramps, barrier-free bathroom conversions, grab bars, and automatic door systems. Custom outdoor sport courts and recreation spaces including site grading, drainage, surfacing, fencing, and lighting.

## Services — Tenant Improvements

- [Tenant Improvements](https://gp-contracting.vercel.app/services/tenant-improvements): Full build-outs and fit-outs for restaurants, retail spaces, fitness facilities, and offices. Three-way coordination between tenant, landlord, and contractor. Permitting, space planning, finishes, lighting, and mechanical included.

## About and Contact

- [About GP Contracting Group](https://gp-contracting.vercel.app/about): Company background, values, and approach to construction.
- [Our Work](https://gp-contracting.vercel.app/projects): Recent projects across residential, commercial, and tenant improvement categories.
- [All Services](https://gp-contracting.vercel.app/services): Full overview of all service categories.

## Contact Information

- **Phone:** +1 (778) 891 9076
- **Email:** info@gpcontracting.ca
- **Address:** Richmond, BC, Canada
- **Service Area:** Greater Vancouver (Richmond, Vancouver, Burnaby, Surrey, Coquitlam, North Vancouver, Delta, New Westminster, Langley, Abbotsford), Vancouver Island (Victoria, Nanaimo), Fraser Valley

## Machine-Readable Content

- [Full site content in Markdown](https://gp-contracting.vercel.app/ai.txt): Complete structured Markdown content for all pages, suitable for LLM ingestion and citation.
- [Sitemap](https://gp-contracting.vercel.app/sitemap.xml): Full sitemap of all indexed URLs.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
