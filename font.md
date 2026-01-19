Update the site typography to feel more elegant, subtle, and law-adjacent (mobile notary). Implement a professional serif for headings and a highly readable sans for body.

Requirements:
- Use next/font/google (no external CSS imports).
- Headings font: "Libre Baskerville" (weights 400, 700)
- Body/UI font: "Inter" (weights 400, 500, 600)
- Set CSS variables and Tailwind font families:
  - font-heading for headings
  - font-sans for body
- Apply typography defaults:
  - body: text-base, leading-relaxed
  - h1: text-4xl md:text-5xl, font-heading, tracking-tight
  - h2: text-2xl md:text-3xl, font-heading, tracking-tight
  - buttons/inputs: font-sans, font-medium
- Ensure the style is restrained: avoid excessive bold weights; keep headings elegant.
- Update global styles so all pages inherit the new typography.
- Provide the exact file changes for:
  - app/layout.tsx (or equivalent)
  - tailwind.config.ts
  - globals.css (if needed)

Output:
- List files changed
- Full updated file contents in code blocks