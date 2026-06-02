export const ratingCategories = [
  {
    key: "vibeAtmosfaere",
    dbColumn: "vibe_atmosfaere",
    label: "Vibe/atmosfære",
  },
  {
    key: "utvalg",
    dbColumn: "utvalg",
    label: "Utvalg",
  },
  {
    key: "pris",
    dbColumn: "pris",
    label: "Pris",
  },
  {
    key: "plassering",
    dbColumn: "plassering",
    label: "Plassering",
  },
  {
    key: "komfort",
    dbColumn: "komfort",
    label: "Komfort",
  },
  {
    key: "service",
    dbColumn: "service",
    label: "Service",
  },
  {
    key: "toalett",
    dbColumn: "toalett",
    label: "Toalett",
  },
  {
    key: "betaling",
    dbColumn: "betaling",
    label: "Betaling",
  },
] as const;

export type RatingCategoryKey = (typeof ratingCategories)[number]["key"];
