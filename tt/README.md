# Testetorsdag

Self-contained Biergarten rating feature for the existing Next app.

## Routes

- `/tt` shows aggregated results.
- `/tt/ny` shows the rating form.

## Environment

Set these variables locally and in Vercel:

```txt
DATABASE_URL=postgres://...
TT_SUBMIT_CODE=shared-submit-code
```

`DATABASE_URL` should point to a Neon Postgres database provisioned through Vercel Marketplace.

## Database

Run `tt/db/001_create_tt_ratings.sql` against the Neon database before using the form.

## Venues

The dropdown options live in `tt/constants/venues.ts`. Replace the placeholder venues there when the real Biergarten list is ready.
