# Lumena

Lumena is a premium English vocabulary platform for Arabic learners, built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Supabase-ready data boundaries.

## What ships in this MVP

- Apple-inspired landing experience with subtle motion and glass surfaces
- Curated 100-word bilingual starter dataset structured for a future 20,000-word catalog
- Word browsing with search, CEFR level filters, and category filters
- Word detail pages with bilingual definitions, examples, related words, and audio-ready placeholders
- Focus mode for distraction-free study
- Four quiz modes:
  - Multiple choice
  - True / false
  - Arabic to English
  - Typing test
- Local progress tracking:
  - Accuracy
  - Weak words
  - Completed words
  - Daily streak
  - Level progress
- Supabase schema for `words`, `categories`, `user_progress`, and `quiz_results`
- API routes for `/api/words` and `/api/daily`

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Supabase

## Project structure

```text
app/
components/
  sections/
  ui/
data/
lib/
supabase/
```

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

Both commands pass in the current state.

## Supabase setup

1. Copy `.env.example` to `.env.local`
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Apply `supabase/schema.sql`

The current MVP uses local persistence for progress and is ready to be connected to Supabase auth and tables next.

## Notes

- The product architecture is ready for a larger 20,000-word import.
- The bundled dataset is intentionally curated and limited to 100 words for the shipped MVP seed.
