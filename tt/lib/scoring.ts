import { ratingCategories } from "../constants/categories";
import type { RatingValues, VenueAggregate } from "../types/rating";

export function normalizeRaterName(name: string) {
  return name.trim().toLocaleLowerCase("nb-NO").replace(/\s+/g, " ");
}

export function parseRatingValue(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 10) {
    return null;
  }

  return parsed;
}

export function averageRating(values: RatingValues) {
  const total = ratingCategories.reduce(
    (sum, category) => sum + values[category.key],
    0
  );

  return total / ratingCategories.length;
}

export function roundScore(value: number) {
  return Math.round(value * 10) / 10;
}

export function aggregateVenueRatings(
  rows: Array<{
    venueSlug: string;
    venueName: string;
    ratings: RatingValues;
  }>
): VenueAggregate[] {
  const grouped = new Map<
    string,
    {
      venueName: string;
      count: number;
      submissionTotal: number;
      categoryTotals: RatingValues;
    }
  >();

  for (const row of rows) {
    const current =
      grouped.get(row.venueSlug) ??
      ({
        venueName: row.venueName,
        count: 0,
        submissionTotal: 0,
        categoryTotals: Object.fromEntries(
          ratingCategories.map((category) => [category.key, 0])
        ) as RatingValues,
      });

    current.count += 1;
    current.submissionTotal += averageRating(row.ratings);

    for (const category of ratingCategories) {
      current.categoryTotals[category.key] += row.ratings[category.key];
    }

    grouped.set(row.venueSlug, current);
  }

  return Array.from(grouped.entries())
    .map(([venueSlug, aggregate]) => ({
      venueSlug,
      venueName: aggregate.venueName,
      ratingCount: aggregate.count,
      totalAverage: roundScore(aggregate.submissionTotal / aggregate.count),
      categoryAverages: Object.fromEntries(
        ratingCategories.map((category) => [
          category.key,
          roundScore(aggregate.categoryTotals[category.key] / aggregate.count),
        ])
      ) as RatingValues,
    }))
    .sort((a, b) => b.totalAverage - a.totalAverage);
}
