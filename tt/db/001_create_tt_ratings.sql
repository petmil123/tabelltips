create table if not exists tt_ratings (
  id bigserial primary key,
  venue_slug text not null,
  venue_name text not null,
  rater_name text not null,
  rater_name_normalized text not null,
  vibe_atmosfaere integer not null check (vibe_atmosfaere between 1 and 10),
  utvalg integer not null check (utvalg between 1 and 10),
  pris integer not null check (pris between 1 and 10),
  plassering integer not null check (plassering between 1 and 10),
  komfort integer not null check (komfort between 1 and 10),
  service integer not null check (service between 1 and 10),
  toalett integer not null check (toalett between 1 and 10),
  betaling integer not null check (betaling between 1 and 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tt_ratings_unique_rater_per_venue unique (
    venue_slug,
    rater_name_normalized
  )
);

create index if not exists tt_ratings_venue_slug_idx
  on tt_ratings (venue_slug);
