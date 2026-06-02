import { ratingCategories } from "../constants/categories";
import type { VenueAggregate } from "../types/rating";

type ResultsTableProps = {
  aggregates: VenueAggregate[];
};

export function ResultsTable({ aggregates }: ResultsTableProps) {
  if (aggregates.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6 text-sm text-neutral-600">
        Ingen vurderinger er lagret ennå.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="w-full min-w-[980px] border-collapse text-sm">
        <thead className="bg-neutral-100 text-left">
          <tr>
            <th className="px-3 py-3 font-medium">#</th>
            <th className="px-3 py-3 font-medium">Biergarten</th>
            <th className="px-3 py-3 text-right font-medium">Total</th>
            <th className="px-3 py-3 text-right font-medium">Antall</th>
            {ratingCategories.map((category) => (
              <th key={category.key} className="px-3 py-3 text-right font-medium">
                {category.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {aggregates.map((aggregate, index) => (
            <tr key={aggregate.venueSlug} className="border-t">
              <td className="px-3 py-3">{index + 1}</td>
              <td className="px-3 py-3 font-medium">{aggregate.venueName}</td>
              <td className="px-3 py-3 text-right font-semibold">
                {aggregate.totalAverage.toFixed(1)}
              </td>
              <td className="px-3 py-3 text-right">{aggregate.ratingCount}</td>
              {ratingCategories.map((category) => (
                <td key={category.key} className="px-3 py-3 text-right">
                  {aggregate.categoryAverages[category.key].toFixed(1)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
