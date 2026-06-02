import type { RatingCategoryKey } from "../constants/categories";

export type RatingValues = Record<RatingCategoryKey, number>;

export type RatingRow = RatingValues & {
  id: number;
  venueSlug: string;
  venueName: string;
  raterName: string;
  raterNameNormalized: string;
  createdAt: Date;
  updatedAt: Date;
};

export type VenueAggregate = {
  venueSlug: string;
  venueName: string;
  ratingCount: number;
  totalAverage: number;
  categoryAverages: RatingValues;
};
