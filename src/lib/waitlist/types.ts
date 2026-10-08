/** Client-safe waitlist types and options (no validation library). */
export const interestOptions = [
  { value: "dating", label: "Dating" },
  { value: "friendship", label: "Friendship" },
  { value: "mentorship", label: "Mentorship" },
] as const;

export type WaitlistField = "email" | "university" | "interests" | "confirmedAdultStudent";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<WaitlistField, string>>;
  /** Echoed back so the form keeps what the person typed after an error. */
  values?: { email: string; university: string; interests: string[]; marketingConsent: boolean };
  /** Changes on every response so the client can re-key the form. */
  nonce?: number;
};

export const initialWaitlistState: WaitlistState = { status: "idle", message: "" };
