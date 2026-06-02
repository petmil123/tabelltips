import { ratingCategories } from "../constants/categories";
import { findVenue } from "../constants/venues";
import type { RatingValues } from "../types/rating";
import { normalizeRaterName, parseRatingValue } from "./scoring";

export type ParsedSubmission = {
  venueSlug: string;
  venueName: string;
  raterName: string;
  raterNameNormalized: string;
  ratings: RatingValues;
  confirmUpdate: boolean;
};

export type ValidationResult =
  | { ok: true; submission: ParsedSubmission }
  | { ok: false; errors: string[] };

export function validateSubmissionForm(formData: FormData): ValidationResult {
  const errors: string[] = [];
  const venueSlug = String(formData.get("venueSlug") ?? "");
  const venue = findVenue(venueSlug);
  const raterName = String(formData.get("raterName") ?? "").trim();
  const raterNameNormalized = normalizeRaterName(raterName);
  const passcode = String(formData.get("passcode") ?? "");
  const expectedPasscode = process.env.TT_SUBMIT_CODE;
  const ratings = {} as RatingValues;

  if (!venue) {
    errors.push("Velg en gyldig Biergarten.");
  }

  if (!raterName) {
    errors.push("Skriv inn navn.");
  }

  if (!expectedPasscode) {
    errors.push("TT_SUBMIT_CODE mangler på serveren.");
  } else if (passcode !== expectedPasscode) {
    errors.push("Feil kode.");
  }

  for (const category of ratingCategories) {
    const value = parseRatingValue(formData.get(category.key));

    if (value === null) {
      errors.push(`${category.label} må være et heltall fra 1 til 10.`);
    } else {
      ratings[category.key] = value;
    }
  }

  if (errors.length > 0 || !venue) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    submission: {
      venueSlug: venue.slug,
      venueName: venue.name,
      raterName,
      raterNameNormalized,
      ratings,
      confirmUpdate: formData.get("confirmUpdate") === "true",
    },
  };
}
