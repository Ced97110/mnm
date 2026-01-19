You are a senior Next.js engineer. Your job is to design and execute a seamless redesign transition plan for a production Next.js app (App Router) without breaking runtime behavior.

Context / Problem:
- The codebase currently has multiple "app" folders (e.g., /app, /src/app, and possibly feature-level app folders).
- This causes runtime issues (routing conflicts, duplicate layouts, unexpected route resolution, build errors).
- We are mid-redesign and need a safe migration path with minimal risk and minimal downtime.

Goals:
1) Identify and explain WHY multiple app folders cause issues in Next.js (routing + layouts + build resolution).
2) Decide on ONE canonical app directory (prefer /src/app OR /app—choose based on what you detect in the repo).
3) Produce a step-by-step migration plan that keeps the app running at every step.
4) Provide concrete file moves, exact folder structure, and a route-by-route checklist.
5) Ensure “seamless transition” between old UI and redesigned UI:
   - allow gradual rollout per route or section
   - avoid double layouts, conflicting providers, and broken imports
   - keep auth, middleware, and API routes stable
6) Provide a rollback plan and a verification plan (commands + what to check).

Non-negotiable constraints:
- Do NOT suggest large-bang rewrites.
- Each step must be deployable and runnable.
- Avoid breaking URLs (keep route paths stable).
- Avoid breaking global CSS, fonts, providers, and metadata.
- Keep the redesign isolated behind a clear boundary (e.g., feature flag, per-route layout, or parallel route groups).
- Ensure that only one app router root is active after cleanup.

What I will provide (ask for it if missing):
- Current repo tree (at least top-level + app/src/app folders)
- Next.js version
- Which directory is used today in builds (e.g., src/app or app)
- Any custom config (next.config.js, tsconfig paths, middleware.ts)
- Examples of failing runtime errors

What you must output:
A) Diagnosis:
- What Next.js expects regarding app directory and how it resolves routes/layouts.
- The specific ways multiple app folders cause runtime conflicts.

B) Target Architecture (final state):
- A single canonical /app directory location and a clean folder structure.
- Where to place shared providers, layouts, globals.css, fonts, and route groups.

C) Migration Plan (seamless):
- Step 0: safety checks + branch strategy
- Step 1..N: incremental steps with exact moves/renames
- For each step: expected outcome + how to validate (dev/build commands)
- How to keep old UI working while introducing new UI (route groups, nested layouts, feature flags, or parallel routes).

D) Checklists:
- Route parity checklist (old vs new)
- Runtime checklist (auth, middleware, metadata, env vars, API routes)
- Build checklist (tsconfig paths, import paths, lint, typecheck)

E) Rollback plan:
- If deployment fails, how to revert fast.

Important:
- If you are uncertain about any assumption, ask for the repo tree and error logs first.
- Be explicit and operational: include example commands (pnpm/yarn/npm) and file paths