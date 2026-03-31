# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
https://alb.reddit.com/cr?za=sSyHSk46SdeSoGZiS2xu_IxtktLiTWP9IrDvEkcJMeOeqLsiJ-m99mdBqetHJ8LFYdT4nttW8JMZdHu2USTO22OheRDkh2OH_YvrjMIdzAHTzXv6cMP72lQy3Wy3i6RST7KBWz0iDNoYCOmSkz0hiVi7S7LnBa1IAhEDPtAsQ2o-NaA7IIpGdkiUgirIQczdmMHWdOfqhY1biQTjXgihVsgQS-nsmekWdUtTkN_JbVDdd5wAYe13p7gw0Uea2AWBk60TVN_5wOOwMPcVRyNgBZkHSMoXZ0oIm8C1o0J6fXvD7N98GPlmfn8vzIgzaQyfZsc8XpopgHKA2C26WAX7RGaVbwUxsS4PP2J-jTj0ebsJhfKaZc9r8FopmFVS0u9TuFJz0Q6LtIjb5WPC7CCauyqycuTSjryLvPOIVStmQ1zac5SogwCTWz8fk8MzsmFJf1plG_yotljRgbP-DpIQftb_iXpFMZNw-_KtHmvnCev9no1SIelr1I4WcTBTkUstVb5qx8dzSGN0k7Fa5FsB-XN1zgRJN6eocKyYYFF1o7L4k65qAPuJTIItT16y2pmQwgD8OYWRulNT-qXqgEXdDrsr-SZH917fb3ZZuGkGqsKBulCbbcz4ovEjX2DWH-EPyE3_g246zXn73gWJOF11mV7pvhOMwgqc1Edzq4EC8JgNwQwraYRfOiUgz3EF-HMH523OwrbVdz6yF56592Wy6nOvouvCGtowVT9rZko&zp=iKl9eME1Bmq3jY2OuXti0OuNEMq0g9NIV_CT0HUatlG515Dv9sK8zjpuKuMxnHyFlq-If0F1aombqxmR--w26m9YGMeTFszMukOJ6KgtFvCg5xoSJP_cMsdkHfw-hK90tJ3G_d5lBpVKMdF-xHQ2r9BtLOLzEMlXUByVhItABbdWZVJFacvaPDxjFdNFEZoDd9dbVEK42httRt0wKn2ZUOJ93tlAa562A9EXxNhPNrMnTTBgUTXEufv53Jkq0rdUeyYePfM0T2yjPTzdVUbkfs9WWkzaBnzHG3dq4CMbHVrXppcXlCpWMIQ5mUM4Ebd4DXWxSRPhqxCsVDThZa9M4kOj1nC0lIaIM3LJuZgTK_Y-F1PnuQyWEe_Rq5ouF-XCZKPi-Hed2_u64X4bTpzeGTK0mArD5OR-4sY5gr8HsVFnsqBQHNpbqGLp6AtCCqa7sSdhw2x38VrNDn4WFpvYxiU&a=1344&b=1342&be=1342&c=1342&d=1344&e=1342&ea=1342&eb=1342&f=1342&r=4&g=1&i=1774804475371&t=1774804476715&o=1&q=1&h=188&w=664&sh=982&sw=1512