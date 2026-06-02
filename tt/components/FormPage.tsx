import Link from "next/link";
import { RatingForm } from "./RatingForm";

export function FormPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8 text-neutral-950 sm:px-6">
      <div className="mx-auto mb-6 flex w-full max-w-3xl items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Ny vurdering</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Testetorsdag Biergarten-score
          </p>
        </div>
        <Link className="text-sm font-medium underline" href="/tt">
          Resultater
        </Link>
      </div>
      <RatingForm />
    </main>
  );
}
