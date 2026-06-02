import { getSql } from "./client";
import { aggregateVenueRatings } from "../lib/scoring";
import type { RatingValues, VenueAggregate } from "../types/rating";

type RatingDbRow = {
  id: number;
  venue_slug: string;
  venue_name: string;
  rater_name: string;
  rater_name_normalized: string;
  vibe_atmosfaere: number;
  utvalg: number;
  pris: number;
  plassering: number;
  komfort: number;
  service: number;
  toalett: number;
  betaling: number;
  created_at: Date;
  updated_at: Date;
};

export type RatingInput = {
  venueSlug: string;
  venueName: string;
  raterName: string;
  raterNameNormalized: string;
  ratings: RatingValues;
};

export async function findExistingRating(
  venueSlug: string,
  raterNameNormalized: string
) {
  const sql = getSql();
  const rows = (await sql`
    select *
    from tt_ratings
    where venue_slug = ${venueSlug}
      and rater_name_normalized = ${raterNameNormalized}
    limit 1
  `) as RatingDbRow[];

  return rows[0] ?? null;
}

export async function createRating(input: RatingInput) {
  const sql = getSql();

  await sql`
    insert into tt_ratings (
      venue_slug,
      venue_name,
      rater_name,
      rater_name_normalized,
      vibe_atmosfaere,
      utvalg,
      pris,
      plassering,
      komfort,
      service,
      toalett,
      betaling
    )
    values (
      ${input.venueSlug},
      ${input.venueName},
      ${input.raterName},
      ${input.raterNameNormalized},
      ${input.ratings.vibeAtmosfaere},
      ${input.ratings.utvalg},
      ${input.ratings.pris},
      ${input.ratings.plassering},
      ${input.ratings.komfort},
      ${input.ratings.service},
      ${input.ratings.toalett},
      ${input.ratings.betaling}
    )
  `;
}

export async function updateRating(input: RatingInput) {
  const sql = getSql();

  await sql`
    update tt_ratings
    set
      venue_name = ${input.venueName},
      rater_name = ${input.raterName},
      vibe_atmosfaere = ${input.ratings.vibeAtmosfaere},
      utvalg = ${input.ratings.utvalg},
      pris = ${input.ratings.pris},
      plassering = ${input.ratings.plassering},
      komfort = ${input.ratings.komfort},
      service = ${input.ratings.service},
      toalett = ${input.ratings.toalett},
      betaling = ${input.ratings.betaling},
      updated_at = now()
    where venue_slug = ${input.venueSlug}
      and rater_name_normalized = ${input.raterNameNormalized}
  `;
}

export async function getVenueAggregates(): Promise<VenueAggregate[]> {
  const sql = getSql();
  const rows = (await sql`
    select *
    from tt_ratings
    order by venue_name asc, updated_at desc
  `) as RatingDbRow[];

  return aggregateVenueRatings(
    rows.map((row) => ({
      venueSlug: row.venue_slug,
      venueName: row.venue_name,
      ratings: {
        vibeAtmosfaere: row.vibe_atmosfaere,
        utvalg: row.utvalg,
        pris: row.pris,
        plassering: row.plassering,
        komfort: row.komfort,
        service: row.service,
        toalett: row.toalett,
        betaling: row.betaling,
      },
    }))
  );
}
