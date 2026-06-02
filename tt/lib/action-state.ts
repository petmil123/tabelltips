export type SubmitRatingState = {
  status: "idle" | "success" | "duplicate" | "error";
  message: string;
  errors: string[];
};

export const initialSubmitRatingState: SubmitRatingState = {
  status: "idle",
  message: "",
  errors: [],
};
