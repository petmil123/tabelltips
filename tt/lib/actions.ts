"use server";

import {
  createRating,
  findExistingRating,
  updateRating,
} from "../db/ratings";
import type { SubmitRatingState } from "./action-state";
import { validateSubmissionForm } from "./validation";

export async function submitRating(
  _previousState: SubmitRatingState,
  formData: FormData
): Promise<SubmitRatingState> {
  const validation = validateSubmissionForm(formData);

  if (!validation.ok) {
    return {
      status: "error",
      message: "Rett opp feilene og prøv igjen.",
      errors: validation.errors,
    };
  }

  const { submission } = validation;

  try {
    const existingRating = await findExistingRating(
      submission.venueSlug,
      submission.raterNameNormalized
    );

    if (existingRating && !submission.confirmUpdate) {
      return {
        status: "duplicate",
        message: `${submission.raterName} har allerede vurdert ${submission.venueName}. Trykk "Oppdater vurdering" hvis du vil erstatte den gamle vurderingen.`,
        errors: [],
      };
    }

    if (existingRating) {
      await updateRating(submission);
      return {
        status: "success",
        message: "Vurderingen ble oppdatert.",
        errors: [],
      };
    }

    await createRating(submission);
    return {
      status: "success",
      message: "Vurderingen ble lagret.",
      errors: [],
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Kunne ikke lagre vurderingen.",
      errors: [],
    };
  }
}
