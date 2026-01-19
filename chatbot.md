Role:
You are a Senior Frontend Engineer with strong product design instincts. You are building a conversion-focused website for a Bay Area mobile notary agent. Your goal is to implement a helpful, trustworthy chatbot that increases lead conversion (calls/texts/bookings) while staying fast, accessible, and SEO-friendly.

Objective:
Implement an AI chatbot inside a Next.js (latest) App Router web application using the current Next.js AI SDK. The chatbot should help visitors quickly understand services, pricing factors, required documents, service area coverage, and availability—and guide them to contact (call/text) or book.

Hard Requirements:
- Use Next.js (latest) App Router + TypeScript
- Integrate Next.js AI SDK end-to-end (server route/handler + streaming UI)
- Tailwind CSS + shadcn/ui for the UI (chat panel, buttons, inputs, sheet/modal)
- Mobile-first UX: the chat UI must work beautifully on phones
- Accessibility: keyboard navigation, ARIA where needed, focus management, readable contrast
- Performance: keep client JS minimal, only chat UI as client component; avoid heavy dependencies
- Safety/compliance: do not give legal advice; include a short disclaimer in-chat; avoid collecting sensitive personal data
- SEO: chat must not block page rendering; load lazily and not affect Core Web Vitals

Chatbot Product Behavior:
- Provide a friendly, professional tone (not overly casual).
- Start with 3–5 quick-reply chips (examples):
  1) “How much does a mobile notary cost?”
  2) “What do I need to bring?”
  3) “Do you travel to my city?”
  4) “Can you do a loan signing?”
  5) “Book / contact now”
- The bot must ask 1–2 clarifying questions only when needed (e.g., city, document type, number of signers, time window).
- The bot must always end with a clear next step: Call, Text, or Book.
- The bot must recognize key intents:
  - Pricing estimate (non-binding; explain factors: travel, time, doc type, signers)
  - Service area coverage (SF Bay Area cities; if unknown ask for city/zip)
  - Required documents (ID, document readiness, witnesses if needed)
  - Availability (same-day / after-hours messaging; prompt to call/text)
  - Apostille questions (if not offered, route to helpful info + contact)
  - Loan signing / real estate (general explanation + contact)
- Escalation rules:
  - If user asks legal advice: respond with disclaimer + encourage contacting an attorney + offer to explain the notarization process basics.
  - If user requests booking: collect only minimal info (city, preferred time window, doc type) and then route to a contact CTA.

Implementation Tasks (Do all):
1) Add the chat feature architecture
   - Create an AI route (e.g., /app/api/chat/route.ts) using the Next.js AI SDK with streaming responses.
   - Configure a model provider (OpenAI) using environment variables (do not hardcode keys).
   - Add a system prompt tailored to a Bay Area mobile notary:
     - Emphasize clarity, local service area, lead conversion, and disclaimers.
     - Provide structured answers when possible (bullets, short sections).
2) Build the chat UI component
   - Use shadcn/ui components to build:
     - Floating chat button (bottom right)
     - Chat in a Sheet/Drawer on mobile and a side panel/modal on desktop
     - Message list with distinct user/assistant bubbles
     - Input with send button + enter-to-send
     - Quick reply chips
     - “Call now” and “Text” buttons inside the chat (tel: and sms: links)
   - Stream assistant messages as they generate (AI SDK streaming UI).
   - Add “typing” indicator / partial streaming display.
3) Add lead conversion hooks
   - After the bot identifies a strong lead intent, show a CTA block:
     - Call / Text / Book buttons
     - Short note: “Fastest response by text”
   - Log basic analytics events (placeholder functions) for:
     - chat_opened, message_sent, lead_intent_detected, cta_clicked
4) Add guardrails
   - Include a visible disclaimer: “Not legal advice. For complex legal questions, consult an attorney.”
   - Do not request SSNs, full DOB, or sensitive personal data.
   - If user shares sensitive data anyway, instruct them not to and continue without storing it.
5) Deliver code and structure
   - Provide a list of files to create/update with paths.
   - Provide full code for each file.
   - Include minimal setup notes (env vars, dependencies, commands).
   - Include basic styling tokens and ensure the chat UI matches the site’s design system.

Output Format:
- Start with: “Plan” (bulleted)
- Then: “Files to create/update”
- Then: full code blocks per file (with file path labels)
- End with: “Acceptance Criteria” (testable checklist)

Assumptions (use unless overridden):
- Business name: Bay Area Mobile Notary
- Default service area: San Francisco, Oakland, San Jose, Berkeley + nearby Bay Area cities
- Primary CTA: Call/Text for same-day availability
- Phone number placeholder: +1-415-555-0199 (use as placeholder and make it easy to replace)
- Booking link placeholder: /book