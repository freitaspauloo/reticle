# Frameline agent brief — Spaceman on the Moon

You are in the **Frameline** repo (`freitaspauloo/frameline`). Implement this screen template end-to-end here. Work on **`dev`** (commit and push there; do not open a PR unless asked). Do **not** clone Reticle.

This is a **screen template**, not a shader material. Do not add it to `MATERIALS_CATALOG`, `v1-launch.ts`, `COMPONENT_NAMES`, or `renderMaterial`.

---

## What to ship

A live, copyable cinematic hero named **Spaceman on the Moon**.

| | |
|---|---|
| Title | Spaceman on the Moon |
| Slug | `spaceman-moon` |
| Route | `/screens/spaceman-moon` |
| Index | `/screens` |
| Price | **$9 USD — the only paid plan for this SKU** |
| Free allowance | **One copy per user per day**. After that, send them to pay $9. After purchase, unlimited copies of this screen. |

Two CTAs on the detail page, and **only** these two:

1. **Copy prompt** — agent brief they paste into Cursor
2. **Copy code** — the real component source (TSX + CSS module)

**No configurator.** No sliders, no color pickers, no share-config URL, no props table, no `npx shadcn add` for this SKU.

---

## Source of truth (Reticle, now on GitHub)

Preview: https://github.com/freitaspauloo/reticle — route `/nudgeai`

Fetch these files and port them. Do not invent a new layout.

- Component: https://raw.githubusercontent.com/freitaspauloo/reticle/master/src/NudgeaiLanding.jsx
- CSS: https://raw.githubusercontent.com/freitaspauloo/reticle/master/src/Nudgeai.css
- Font: https://github.com/freitaspauloo/reticle/blob/master/public/fonts/manrope-latin.woff2

Hero media (vendor into Frameline `public/` — do not keep pointing at Reticle’s bucket in the shipped template):

- Video: `https://aruyghvpjdiiuiesaupw.supabase.co/storage/v1/object/public/nudgeai-hero/nudegai-bg.mp4`
- Poster: `https://aruyghvpjdiiuiesaupw.supabase.co/storage/v1/object/public/nudgeai-hero/nudgeai-bg.png.png`

Put media at:

```
public/screens/spaceman-moon/hero.mp4
public/screens/spaceman-moon/poster.png
```

Copy the Manrope woff2 into Frameline (e.g. `public/fonts/manrope-latin.woff2`) or load it with `next/font`. The original screen uses Manrope — keep it.

---

## Product rules (locked)

### Rename
This is **not** NudgeAI and **not** Reticle.

- Strip Reticle wordmark, yield copy, foundry names (TSMC / ASML / KLA / Applied), defect-inspection pins.
- Keep the **look**: full-bleed astronaut-on-magenta-moon video, color-blend overlay (`#d600bf` / mix-blend), glass pills, floating pins, slow video, hover-pause.
- Demo copy inside the template should match the visual (cinematic / lunar / spaceman). Placeholder brand e.g. **Lunar**. Buyers will swap it.

### Preserve from the original
- Video fade-in / fade-out loop, `playbackRate` ~0.55, poster underneath
- Magenta color-blend overlay + glow + vignette
- Glass pill nav + mobile menu
- Centered headline, lede, two in-hero CTAs, logo strip
- Four floating feature pins with hover lift + video pause
- CSS entrance choreography
- `prefers-reduced-motion` → still poster, no tick audio, no entrance motion

### Port style
- `"use client"` TypeScript
- **Scoped CSS module** (`spaceman-moon.module.css`) — do **not** Tailwind-rewrite the ~870-line CSS. Fidelity first.
- Suggested layout:

```
src/screens/spaceman-moon/spaceman-moon.tsx
src/screens/spaceman-moon/spaceman-moon.module.css
src/screens/spaceman-moon/copy.ts          # prompt string + code string
src/screens/spaceman-moon/index.ts
src/screens/catalog.ts
src/screens/types.ts
src/app/screens/page.tsx
src/app/screens/[slug]/page.tsx
src/components/screen-detail-page.tsx
```

Reuse material-detail **chrome** (marketing nav/footer, live stage, copy buttons, `recordInstallIntent`) and strip controls.

### Copy payloads
- **Prompt:** a short Cursor/agent brief: full-viewport cinematic hero, video treatment, overlay, nav, type, pins, reduced-motion, file paths. Enough to reconstruct without reverse-engineering CSS.
- **Code:** the real `SpacemanMoon` TSX + CSS module, plus a one-liner to drop `hero.mp4` / `poster.png` in `public/screens/spaceman-moon/`. Not a fake snippet.

Log copies with `recordInstallIntent` using `path: "prompt" | "code"` and slug `spaceman-moon`.

---

## Monetization (this SKU only)

Do **not** reuse Free / Static $19 / Personal $99 / Team $299 for this screen. Those stay on materials.

### Price
- **$9 USD**
- **The only paid plan** for `spaceman-moon`
- One-time purchase, not a subscription
- After payment: that user can copy prompt + code **unlimited** for this screen

### Free allowance
- **One free copy per user per day** (UTC day is fine; say so in UI)
- “Copy” means a successful Copy prompt **or** Copy code. Either one spends the daily free slot.
- While they still have the free slot: both CTAs work, clipboard writes, toast “Copied”.
- After the free slot is used **and they have not purchased:**
  - Do **not** write the prompt/code to the clipboard
  - Send them to pay **$9** (checkout for this SKU)
  - CTAs become pay CTAs (“Get unlimited copies — $9”) or the click opens checkout
- If they already own the $9 license: both CTAs always copy, no gate

### Who is “a user”
Use Frameline’s existing auth (Firebase session) when signed in.

Anonymous visitors: bind the daily quota to a durable device cookie (and persist it to the account on sign-in / checkout so they cannot reset by refreshing). Do not rely on IP alone.

Paid entitlement must be durable (Postgres / existing entitlements table if present). Daily free quota can be DB row keyed by `userId | anonymousId` + `yyyymmdd` + `slug`.

### Checkout
- Wire Stripe Checkout for this SKU at **$9.00 USD**
- Success → grant entitlement `spaceman-moon` (or a `screens` product id) → return to `/screens/spaceman-moon` with copy unlocked
- Guest checkout is fine if materials already support it; attach the anonymous id so the quota/license survives
- Do not add Personal/Team/Extended options on this page

### UI copy (detail page)
Be explicit and short:

- Before first copy today: “1 free copy today. Then $9 for unlimited.”
- After free copy, unpaid: “You’ve used today’s free copy. $9 unlocks unlimited prompt + code.”
- After purchase: no quota messaging

---

## Do not

- Mix this into the materials catalog or V1 launch slugs
- Port other Reticle screens
- Port the NudgeAI skeleton
- Change global Frameline material pricing
- Open a pull request unless asked
- Leave the hero video hosted on the Reticle Supabase URL in shipped code

---

## Done when

- [ ] `/screens` lists Spaceman on the Moon
- [ ] `/screens/spaceman-moon` shows the live hero (video, overlay, pins, motion)
- [ ] Reticle/yield branding is gone; name and demo copy match the spaceman/moon visual
- [ ] Media is vendored under `public/screens/spaceman-moon/`
- [ ] No configurator
- [ ] Copy prompt and Copy code work
- [ ] First copy in a UTC day is free; the next copy that day is blocked and sends unpaid users to **$9** checkout
- [ ] After $9 payment, copies are unlimited for that user
- [ ] `pnpm smoke` / `pnpm build` still pass (materials catalog unchanged)

Work on `dev`. Commit in logical chunks. Push `origin dev`.
