export type Venue = {
  slug: string;
  name: string;
};

export const venues: Venue[] = [
  { slug: "zur-schwalbe", name: "Zur Schwalbe" },
  { slug: "platzwirt", name: "Platzwirt" },
  { slug: "max-weber-platz", name: "Max Weber-Platz" },
  { slug: "westpark", name: "Westpark" },
  { slug: "luitpoldpark", name: "Luitpoldpark" },
  { slug: "augustinerkeller", name: "Augustinerkeller" },
  { slug: "lowenbraukeller", name: "Lowenbraukeller" },
  { slug: "nockherberg", name: "Nockherberg" },
  { slug: "tegernsee-brauhaus", name: "Tegernsee Brauhaus" },
  { slug: "alte-utting", name: "Alte Utting" },
  { slug: "kalypso", name: "Kalypso" },
  { slug: "vors-i-ny-54", name: "Vors i ny 54" },
  { slug: "taj-mahal", name: "Taj Mahal" },
  { slug: "zum-flaucher", name: "Zum Flaucher" },
  { slug: "helene", name: "Helene" },
  { slug: "olympiapark", name: "Olympiapark" },
  { slug: "bavaria", name: "Bavariapark" },
];

export function findVenue(slug: string) {
  return venues.find((venue) => venue.slug === slug);
}
