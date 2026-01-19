Role:
You are a Senior Frontend Engineer with strong product design instincts. You are building a Bay Area mobile notary website focused on local SEO + lead conversion.

Task:
Integrate an interactive map into the “Serving the Entire Bay Area” section. When a user selects a city (from the map or a list), the UI must show an estimated driving fee (approximation) and a clear CTA to call/text/book.

Tech Stack (MUST use):
- Next.js (latest) App Router + TypeScript
- Tailwind CSS
- shadcn/ui components
- Keep client components minimal; the map widget can be a client component.
- Do NOT degrade performance or Core Web Vitals.

Map Implementation Constraints:
- Use a modern map solution suitable for Next.js (e.g., Mapbox GL JS or Google Maps JS). Prefer Mapbox for pricing/implementation simplicity unless constraints require Google.
- Keys MUST be stored in environment variables (no hardcoding).
- Map must be lazy-loaded (dynamic import) so the page still loads fast.
- Provide a graceful fallback (city dropdown/list) if map fails to load or JS is disabled.

Product / UX Requirements:
- Mobile-first: the map should be usable on mobile; if map is too small, allow switching to “List view”.
- The section MUST include:
  - A headline + short copy describing service coverage
  - Interactive map
  - City selector (searchable dropdown) as an alternative to clicking on the map
  - Estimated travel fee output
  - CTA buttons: Call / Text / Book
  - A disclaimer: “Travel fee is an estimate; final fee depends on exact address, time, and appointment details.”

City Selection & Fee Approximation Logic (MUST implement):
- Base location: choose a reasonable “home base” for the notary (default: Downtown San Francisco) and store it in config so it’s easy to change.
- When a user selects a city, compute an approximate driving fee using one of these methods:
  Option A (Preferred): Use Distance Matrix / Directions API (Mapbox Directions or Google Distance Matrix) to estimate driving distance/time.
  Option B (Fallback): Use a local lookup table of approximate miles per city if API fails.
- Fee model (editable constants):
  - base_fee: e.g., $0
  - per_mile_rate: e.g., $1.50/mile OR per-minute rate
  - minimum_travel_fee: e.g., $25
  - maximum_cap (optional)
- Display:
  - Estimated miles (or minutes)
  - Estimated travel fee range (e.g., “$25–$35”) to avoid false precision
  - A short explanation of factors affecting final price

SEO Considerations:
- Service area content must remain indexable (don’t hide the whole section behind JS).
- Include a static list of cities with internal links to city service pages (e.g., /mobile-notary-san-francisco).
- Map UI is enhancement; the city list should exist in HTML.

Data Requirements:
- Create a canonical list of Bay Area cities served (at least 15–25).
- Each city entry should include:
  - name
  - slug/path (for internal link)
  - coordinates (lat/lng) for map markers
- Include a “Not served?” behavior: if user enters an unknown city, respond with “Contact us—service may be available” and show CTA.

Implementation Tasks:
1) Add a “Serving the Entire Bay Area” section component that includes:
   - Map (lazy-loaded)
   - Searchable city dropdown (shadcn/ui Combobox)
   - Fee estimate card (shadcn/ui Card)
   - CTA buttons (tel:, sms:, /book)
   - Static city list with links for SEO
2) Add an API route for fee estimation (server-side) to avoid exposing secrets:
   - /app/api/travel-fee/route.ts
   - Accept city slug or coordinates
   - Call map provider directions/distance API
   - Return distance/time + computed fee range
   - Add caching headers to reduce cost
3) Add fallback logic if API errors:
   - Use lookup table per city to compute approximate fee
4) Add accessibility + performance:
   - Keyboard accessible city selection
   - Focus management
   - Reduced-motion support
   - Avoid layout shift (reserve space for map)
   - Use dynamic import for map code
5) Provide complete code and file structure:
   - List files to create/update
   - Provide full content for each file in code blocks

Output Format:
- Plan
- Files to create/update (paths)
- Code per file (full contents)
- Acceptance Criteria (testable checklist)

Assumptions (use unless overridden):
- Business name: Bay Area Mobile Notary
- Base location coordinates: 37.7749, -122.4194 (San Francisco)
- Phone placeholder: +1-415-555-0199
- SMS placeholder: +1-415-555-0199
- Booking link: /book
- Rate defaults (editable in config):
  - minimum_travel_fee = 25
  - per_mile_rate = 1.50
  - fee_range_padding = 0.15 (±15%)