import Link from "next/link";
import { getVenueAggregates } from "../db/ratings";
import { ResultsTable } from "./ResultsTable";

export async function ResultsPage() {
  let content: React.ReactNode;

  try {
    const aggregates = await getVenueAggregates();
    content = <ResultsTable aggregates={aggregates} />;
  } catch (error) {
    content = (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-900">
        {error instanceof Error
          ? error.message
          : "Kunne ikke hente resultater."}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8 text-neutral-950 sm:px-6">
      <div className="mx-auto mb-6 flex w-full max-w-6xl items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Testetorsdag</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Biergarten-resultater
          </p>
        </div>
        <Link
          className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
          href="/tt/ny"
        >
          Ny vurdering
        </Link>
      </div>
      <div className="mx-auto w-full max-w-6xl">{content}</div>
    </main>
  );
}
