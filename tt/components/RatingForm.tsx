"use client";

import { useActionState, useEffect, useState } from "react";
import {
  ratingCategories,
  type RatingCategoryKey,
} from "../constants/categories";
import { venues } from "../constants/venues";
import { initialSubmitRatingState } from "../lib/action-state";
import { submitRating } from "../lib/actions";

function createEmptyRatings() {
  return Object.fromEntries(
    ratingCategories.map((category) => [category.key, ""])
  ) as Record<RatingCategoryKey, string>;
}

export function RatingForm() {
  const [venueSlug, setVenueSlug] = useState("");
  const [raterName, setRaterName] = useState("");
  const [ratingInputs, setRatingInputs] = useState(createEmptyRatings);
  const [passcode, setPasscode] = useState("");
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [state, formAction, isPending] = useActionState(
    submitRating,
    initialSubmitRatingState
  );

  useEffect(() => {
    if (state.status === "success") {
      setVenueSlug("");
      setRaterName("");
      setRatingInputs(createEmptyRatings());
      setPasscode("");
      setConfirmUpdate(false);
    }

    if (state.status === "duplicate") {
      setConfirmUpdate(true);
    }
  }, [state.status]);

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-lg border bg-white p-4 shadow-sm sm:p-6"
    >
      <input
        type="hidden"
        name="confirmUpdate"
        value={confirmUpdate ? "true" : "false"}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Biergarten
          <select
            name="venueSlug"
            value={venueSlug}
            required
            className="h-11 rounded-md border px-3 text-base"
            onChange={(event) => {
              setVenueSlug(event.target.value);
              setConfirmUpdate(false);
            }}
          >
            <option value="">Velg Biergarten</option>
            {venues.map((venue) => (
              <option key={venue.slug} value={venue.slug}>
                {venue.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium">
          Navn
          <input
            name="raterName"
            value={raterName}
            required
            autoComplete="name"
            className="h-11 rounded-md border px-3 text-base"
            onChange={(event) => {
              setRaterName(event.target.value);
              setConfirmUpdate(false);
            }}
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {ratingCategories.map((category) => (
          <label
            key={category.key}
            className="flex items-center justify-between gap-4 rounded-md border p-3 text-sm font-medium"
          >
            <span>{category.label}</span>
            <input
              name={category.key}
              type="number"
              min={1}
              max={10}
              required
              inputMode="numeric"
              value={ratingInputs[category.key]}
              onChange={(event) =>
                setRatingInputs((current) => ({
                  ...current,
                  [category.key]: event.target.value,
                }))
              }
              className="h-10 w-20 rounded-md border px-3 text-center text-base"
            />
          </label>
        ))}
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium">
        Kode
        <input
          name="passcode"
          type="password"
          value={passcode}
          required
          autoComplete="off"
          onChange={(event) => setPasscode(event.target.value)}
          className="h-11 rounded-md border px-3 text-base"
        />
      </label>

      {state.message ? (
        <div
          className={
            state.status === "success"
              ? "rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-900"
              : state.status === "duplicate"
                ? "rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950"
                : "rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900"
          }
        >
          <p>{state.message}</p>
          {state.errors.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {state.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isPending}
          className="h-11 rounded-md bg-neutral-950 px-5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending
            ? "Lagrer..."
            : confirmUpdate
              ? "Oppdater vurdering"
              : "Lagre vurdering"}
        </button>

        {confirmUpdate ? (
          <button
            type="button"
            className="h-11 rounded-md border px-5 text-sm font-medium"
            onClick={() => setConfirmUpdate(false)}
          >
            Avbryt oppdatering
          </button>
        ) : null}
      </div>
    </form>
  );
}
