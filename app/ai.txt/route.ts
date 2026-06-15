export async function GET() {
  const content = `# GP Contracting Group

## Company Overview

GP Contracting Group is a family-owned general contracting company based in Richmond, BC. We deliver residential, commercial, tenant improvement, and specialized construction across Greater Vancouver, Vancouver Island, and the Fraser Valley. Built on a family legacy of doing what is right, we hold every project to one standard regardless of size or scope.

**Phone:** +1 (778) 891 9076
**Email:** info@gpcontracting.ca
**Location:** Richmond, BC
**Website:** https://gp-contracting.vercel.app

---

## Service Areas

Greater Vancouver: Richmond, Vancouver, Burnaby, Surrey, Coquitlam, North Vancouver, Delta, New Westminster, Langley, Abbotsford
Vancouver Island: Victoria, Nanaimo
Fraser Valley

---

## Services

### Custom Home Construction
Ground-up custom homes designed and built with architectural collaboration, premium materials, and modern performance standards. GP Contracting Group works alongside clients at every stage from first concept to final walkthrough, managing engineering, permitting, trades, and finishing. Every build begins with a thorough pre-construction phase where scope, materials, and budget are mapped out before any work begins.

### Home Renovations
Kitchen renovations, bathroom upgrades, whole-home transformations, and structural work including additions. GP Contracting Group brings a disciplined pre-construction process to every renovation with one dedicated project manager from first consultation through to final walkthrough. Serving Vancouver, Burnaby, North Vancouver, Surrey, New Westminster, and the wider Greater Vancouver area.

### Multi-Family Development
Duplexes, townhouse complexes, and low-rise developments built for rental income, long-term durability, and lasting property value. GP Contracting Group coordinates trades, schedules, and code compliance across all units with a single accountable project manager. Serving Richmond, Langley, and throughout Greater Vancouver and the Fraser Valley.

### Commercial Construction
Ground-up commercial construction and interior build-outs for offices, retail spaces, mixed-use buildings, and industrial facilities. GP Contracting Group has delivered fast-tracked commercial builds for some of the most recognized franchise brands in British Columbia, including projects completed in under 60 days from permit to open doors. Serving Vancouver, Surrey, Abbotsford, and across Greater Vancouver.

### Restaurant and Bar Construction
Purpose-built hospitality environments designed around kitchen efficiency, guest flow, and operational durability. GP Contracting Group manages commercial kitchen layouts, Type 1 and Type 2 hood systems, grease interceptors, health authority compliance, and equipment rough-ins. Repeat clients include major franchise operators across British Columbia.

### Structural and Building Envelope
Roofing systems and structural steel framing installed with engineered approvals and disciplined installation. Roofing spans both residential and commercial buildings including asphalt shingle, metal, torch-on, TPO, and modified bitumen systems. Structural steel framing includes seismic compliance, engineer-approved connections, and quality assurance inspections throughout erection.

### Building Systems Upgrades
Suspended acoustic ceiling systems (T-bar) and electrical infrastructure upgrades including EV charger installation, panel upgrades, and load assessments for residential and commercial properties. Serving Richmond, Vancouver, North Vancouver, Coquitlam, Surrey, Langley, and across Greater Vancouver and Vancouver Island.

### Accessibility and Outdoor Living
Accessibility renovations including wheelchair ramps, barrier-free bathroom conversions, grab bar installation, automatic door systems, widened doorways, and aging-in-place modifications for residential and commercial properties. Custom outdoor recreation spaces including backyard basketball courts and multi-sport surfaces with site grading, drainage, surfacing, fencing, and lighting.

### Tenant Improvements
Full build-outs and fit-outs for restaurants, retail spaces, fitness facilities, and offices. GP Contracting Group works directly with tenants, property owners, and landlords to deliver spaces ready for business on time and on budget. Services include space planning, modern finishes, lighting design, mechanical optimization, permitting, and inspection coordination.

---

## Frequently Asked Questions

### Do you handle both residential and commercial projects?
Yes. GP Contracting Group works across residential custom homes, renovations, and multi-family development, commercial offices, retail, restaurants, and industrial facilities, tenant improvements, and specialized trades including roofing, steel framing, acoustic ceilings, EV charging, accessibility renovations, and outdoor recreation spaces.

### Which areas do you serve?
Greater Vancouver including Richmond, Vancouver, Burnaby, Surrey, Coquitlam, North Vancouver, Delta, New Westminster, Langley, and Abbotsford. Also Vancouver Island including Victoria and Nanaimo, and the Fraser Valley.

### Do you manage permits and approvals?
Yes. GP Contracting Group manages the full permitting process and coordinates inspections with municipal authorities across Greater Vancouver, Vancouver Island, and the Fraser Valley.

### How do I get started?
Contact GP Contracting Group at info@gpcontracting.ca or call +1 (778) 891 9076 to start with a consultation. We visit the site, assess the scope, and provide a detailed proposal before any work begins.

### Do you work with franchise operators on multiple locations?
Yes. GP Contracting Group has a strong track record with franchise operators delivering multiple locations to consistent brand standards and tight timelines.

### How quickly can you complete a commercial build?
GP Contracting Group has delivered full commercial restaurant builds in under 60 days from permit to open doors. Timeline depends on scope and permitting and we provide honest estimates during pre-construction.

### What makes GP Contracting Group different?
As a family-owned company we bring a personal level of accountability to every project. One dedicated project manager from first consultation to final walkthrough, a disciplined pre-construction process that eliminates surprises, and one consistent standard of craftsmanship regardless of project size.

---

## About GP Contracting Group

GP Contracting Group is a family-owned construction company grounded in a legacy of doing what is right. We serve clients across Greater Vancouver, Vancouver Island, and the Fraser Valley with one consistent standard of craftsmanship and accountability across every project type. Our pre-construction process is a core differentiator — before any work begins we map out full scope, materials, budget, and timeline so there are no surprises once construction starts. Clients work with one dedicated project manager from first consultation through to final walkthrough with regular updates throughout.

---

## Contact

**Phone:** +1 (778) 891 9076
**Email:** info@gpcontracting.ca
**Address:** Richmond, BC, Canada
**Website:** https://gp-contracting.vercel.app
**Services:** https://gp-contracting.vercel.app/services
**About:** https://gp-contracting.vercel.app/about
**Sitemap:** https://gp-contracting.vercel.app/sitemap.xml
**LLMs:** https://gp-contracting.vercel.app/llms.txt
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
