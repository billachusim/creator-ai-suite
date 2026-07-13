
# CreatorBoost AI — First Pass

Build a premium, Linear/Stripe-style SaaS landing page for CreatorBoost AI, a full SEO landing page for each of the 25 AI tools, and end-to-end working generation for 5 flagship tools. Enable Lovable Cloud for auth (email + Google) and per-user AI history. Payments, blog, admin, and remaining tools deferred.

## Scope

**In scope (this pass)**
- Homepage: hero, tool search, popular tools grid, "how it works", testimonials, pricing preview, FAQ, newsletter capture, footer.
- Dedicated SEO route + landing page per tool (25 routes) with unique `head()` metadata, breadcrumbs, JSON-LD, canonical, OG tags.
- 5 flagship tools with real AI generation, streamed results, copy-to-clipboard, and optional save-to-history when signed in:
  1. YouTube Title Generator
  2. Instagram Caption Generator
  3. Hashtag Generator
  4. TikTok Hook Generator
  5. Viral Content Idea Generator
- Remaining 20 tool pages: full SEO landing + "Coming soon / Join waitlist" CTA (email captured to Cloud).
- Auth: email/password + Google OAuth via Lovable Cloud; `/auth` public route, minimal `/dashboard` under `_authenticated/` showing recent generations and favorites.
- Cloud schema: `profiles`, `user_roles` (with `has_role`), `generations`, `favorites`, `waitlist`, `newsletter_subscribers`.
- Sitemap.xml + robots.txt covering all tool routes.
- Light + dark mode, mobile-first, semantic design tokens.

**Out of scope (later passes)**
Payments (Stripe/Paddle/Paystack/Flutterwave), credit system, blog CMS, admin dashboard, brand voice trainer, thumbnail image analysis, channel audit scraping, remaining 20 tools' generation logic, team plans, API access.

## Design direction

Premium ChatGPT / Linear / Stripe feel. Deep neutral background in dark mode, soft off-white in light. Single accent (electric violet → indigo gradient) reserved for CTAs and tool icons. Generous whitespace, rounded-2xl cards with subtle borders, Geist/Inter-style typography, smooth micro-interactions on hover and generate. No purple-on-white generic AI gradients across whole sections.

## Technical details

**Stack**
- TanStack Start (existing), Tailwind v4, shadcn.
- Lovable Cloud (Supabase) for auth + DB.
- Lovable AI Gateway via AI SDK; default model `openai/gpt-5.5` with `service_tier: "priority"` for snappy generations.

**Routes**
```
/                              home
/auth                          sign in / sign up (email + Google)
/tools                         index of all 25 tools (search + filter)
/tools/$slug                   dynamic landing page per tool
/pricing, /faq, /about, /contact
/_authenticated/dashboard      recent generations + favorites
/api/chat/$tool                streaming generation endpoint per tool family
/sitemap[.]xml                 dynamic sitemap
```
Tool metadata (name, slug, category, description, SEO title/description, input schema, prompt template, status: `live` | `waitlist`) lives in `src/lib/tools/registry.ts`. The 5 live tools point at real generators; the other 20 render the shared waitlist CTA.

**DB (public schema, with GRANTs + RLS)**
- `profiles(id uuid pk → auth.users, display_name, avatar_url)` — trigger on signup.
- `user_roles(user_id, role app_role)` + `has_role(uuid, app_role)` security-definer fn.
- `generations(id, user_id, tool_slug, input jsonb, output jsonb, created_at)` — RLS owner-only.
- `favorites(user_id, tool_slug, unique)` — RLS owner-only.
- `waitlist(id, tool_slug, email, created_at)` — anon INSERT allowed, no SELECT for anon.
- `newsletter_subscribers(id, email, created_at)` — anon INSERT only.

**AI layer**
- `src/lib/ai-gateway.server.ts` with the canonical provider helper (`Lovable-API-Key`, run-id fetch wrapper, `structuredOutputs: true`).
- `src/routes/api/chat/$tool.ts` server route: validates input with Zod, looks up tool in registry, streams via `streamText` + `toUIMessageStreamResponse`, forwards `X-Lovable-AIG-*` headers.
- If a user is signed in, handler also persists the final output to `generations` via `supabaseAdmin` (after verifying bearer).
- Client uses `useChat` / plain `fetch` streaming into a result card with copy buttons.

**SEO**
- Per-tool `head()` returns unique title, description, og:title/description, canonical, breadcrumb JSON-LD, and SoftwareApplication JSON-LD.
- Root `__root.tsx` sets sitewide defaults (site name, viewport, twitter card) — no og:image at root.
- `public/robots.txt` allows all; sitemap route enumerates `/`, static pages, and every `/tools/$slug`.

**Design tokens**
Update `src/styles.css` with a new palette (background, foreground, card, primary violet, primary-glow, accent, gradient-primary, shadow-elegant) for both `:root` and `.dark`. All components consume tokens — no hardcoded colors.

## Build order

1. Enable Lovable Cloud + ensure `LOVABLE_API_KEY`.
2. Design tokens in `styles.css` + shared layout shell (nav, footer, theme toggle).
3. Tool registry + shared tool page template + waitlist form.
4. Homepage sections.
5. `/tools` index + all 25 `/tools/$slug` SEO pages (waitlist variant).
6. AI gateway helper + streaming API route + wire the 5 flagship tools to real generation.
7. Auth pages + `_authenticated/dashboard` with generations & favorites.
8. DB migrations (tables + GRANTs + RLS + triggers).
9. Sitemap route + robots.txt + per-route head metadata pass.
10. Dark mode QA, mobile QA, Lighthouse pass.

## Confirmations before I start

- Newsletter + waitlist emails will just be captured to the DB for now (no email sending). OK?
- No payments this pass — pricing section will be presentational with a "Join waitlist" on paid plans. OK?
