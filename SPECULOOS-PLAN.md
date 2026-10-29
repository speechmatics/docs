# Speculoos pilot — site plan

> Working notes for PR #331. Remove this file before the PR merges to `main`.

The work on the Speechmatics side of the Speculoos pilot (PR #331): what renders around the
reference, in `src/components/Speculoos/` and `src/theme/`. The reference itself, the
field rows and sections drawn by `@speculoos/map-radix-themes`, is planned in the Speculoos
repo's `docs/PLAN.md` (M7). The two proceed in parallel; this side picks the map's changes
up with each new alpha (`npm run speculoos:local` tries local packs first).

## Styling

From a review of the pilot in a browser (2026-10-29): every reference page, light and dark,
at 1534, 820 and 390 pixels wide.

1. **The page body fills its width.** `<Box maxWidth="1000px">` in
   `src/theme/DocRoot/Layout/Main/index.tsx` is a flex child with no width, so it shrinks
   to its content. Six of the eight Management pages, and `/api-ref`, measure 808–945
   pixels, so the layout jumps from page to page. Fix: `width="100%"`. It is shared by
   every docs page, so check a few prose pages after.
2. **The session panel comes first on small screens.** Below `lg` it stacks after the
   whole reference: 15,000 pixels down on a phone. Move it above the reference, collapsed
   (`SessionPanel.tsx`, and the grid in `index.tsx`).
3. **The side panel's examples say what they are.** Each row reads "Response". Label each
   with the status's description ("Created", "Bad request"), under a heading that says
   these are examples, so it does not read as a repeat of the main column's Responses
   (`OperationPanel.tsx`).
4. **`<Schema>` in a guide is introduced and focused.**
   - It gets a heading that names its type and links to the reference.
   - It can open a named field. The translation guide shows the whole transcript, with
     `translations` collapsed among the rest.
   - The first row's top rule sits just under the card edge and doubles it; drop one of
     the two (`Schema.tsx`).
5. **`info.description` renders.** Each API's overview is in the spec but shows nowhere.

The session panel stays a card: it is small and self-contained, the shape the Speculoos
plan keeps cards for.

*Checked and fine:* the session panel's hover card opens inside the window. The blank page
for about two seconds on a first load is the dev server's; the Vercel preview renders at
once.

## Housekeeping

6. Three `tsc` errors: `remark-admonition.ts`, `LinkCard.tsx`, `Tabs/index.tsx`.
7. `react-markdown` 8 moves to the current major.
