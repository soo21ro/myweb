# Codex project instructions

- Use Traditional Chinese for user-facing copy.
- Keep the mobile-first responsive layout and existing visual language.
- Do not replace the app with a static mockup; build working flows.
- Before editing, inspect README.md and supabase/schema.sql.
- After each feature, run `npm run build` and fix errors.
- Never expose Supabase service_role keys or secrets to the browser.
- Never trust totals/prices sent by the client. Production order creation must validate menu items and calculate totals server-side.
- Enforce authorization on the server and with Supabase RLS.
- Add chat moderation, report/block controls, input length limits and basic rate limiting before enabling public chat.
- Seed/demo restaurant information is fictional and must be clearly labeled until verified with real businesses.
- Keep payment at pickup for the prototype; do not store payment card details.
