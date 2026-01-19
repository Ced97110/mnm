You are working inside a monorepo / codebase. Goal: migrate the existing “schedule appointment with Calendly” feature from an old app into this existing application without breaking current behavior.

Context:
- I will share the folder path (old app folder) that contains the working Calendly scheduling feature.
- You must first locate the exact component(s) and any supporting files used for scheduling via Calendly.
- Then you must integrate/port the feature into the new app while preserving ALL existing functionality and user flow.

Tasks (do in this order):

1) Discover the Calendly feature in the old app
- Search the old folder for keywords: “calendly”, “Calendly”, “InlineWidget”, “PopupWidget”, “openPopupWidget”, “calendly.com”, “schedule”, “booking”, “appointment”, “event”, “router push”, “utm”, “prefill”.
- Identify:
  a) the primary UI component(s) responsible for scheduling
  b) any wrapper components/hooks/utilities it depends on
  c) config/constants (e.g., Calendly URL, event type link, env vars)
  d) analytics/tracking calls (GA/Segment/PostHog/etc.)
  e) styling assets (CSS modules, Tailwind classes, styled-components, etc.)
  f) routing behavior (where it navigates after scheduling, query params, callback URLs)
  g) any forms/prefill logic (name/email/phone/company, UTM params, invitee info)

2) Map dependencies + required behavior
- Produce a brief “Feature Map” in your response with:
  - Entry point: where user clicks “Schedule” (button/page/modal)
  - Scheduling UI type: inline embed vs popup vs redirect
  - Required inputs: props/state/context needed (user data, UTM, locale, timezone)
  - Side effects: tracking events, redirects, success states, error states
  - Integration points: auth/session, API calls, backend logging (if any)

3) Port the feature into the new app
- Implement the same UX and behavior in the new app:
  - Recreate component(s) in the new app in the appropriate folder (follow this repo’s conventions).
  - Recreate or adapt any hooks/utilities/config files that the feature relies on.
  - If the old feature uses an external package (e.g. react-calendly), add it if it’s missing and wire it correctly.
  - If there are environment variables (Calendly URL, event type URL), add them to the new app’s env handling and document the required keys.
  - Ensure routing, query params, and prefill logic match the old behavior.

4) Preserve existing functionality exactly
- Do NOT simplify away features.
- Preserve:
  - prefilled fields and UTM propagation
  - analytics events naming & payloads (or provide an adapter that preserves semantics)
  - UI states (loading/open/close/success)
  - any gating logic (auth-required, region-based, etc.)

5) Integration constraints
- Minimize changes outside the scheduling feature unless required.
- If the new app already has a scheduling flow, integrate into it rather than duplicating routes/components.
- Follow linting/formatting rules already used here.
- Match the UI styling system already used (Tailwind/shadcn/etc.) while keeping behavior identical.

6) Verification
- Add a short checklist of how to verify locally:
  - Where to click
  - Expected prefill
  - Expected tracking calls (where to see logs)
  - Expected redirect/success state

Before making edits, show me:
- The files you found in the old app that implement scheduling (with paths)
- The files you plan to create/modify in the new app (with paths)
Then proceed with the migration.

Start now by scanning the shared folder for the Calendly scheduling feature and report your findings.


