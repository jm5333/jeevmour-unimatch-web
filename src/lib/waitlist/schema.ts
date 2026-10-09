import "server-only";
import { z } from "zod";

// Control characters, zero-width characters, bidi overrides and the BOM.
const INVISIBLE_CHARS = new RegExp(
  "[\\u0000-\\u001F\\u007F-\\u009F\\u200B-\\u200F\\u2028-\\u202E\\u2060-\\u206F\\uFEFF]",
  "g",
);

/** Remove invisible/control characters and collapse runs of whitespace. */
function clean(value: string) {
  return value
    .normalize("NFKC")
    .replace(INVISIBLE_CHARS, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const waitlistSchema = z.object({
  email: z
    .string()
    .transform(clean)
    .pipe(
      z
        .string()
        .toLowerCase()
        .min(1, { error: "Enter your email address." })
        .max(254, { error: "That email address is too long." })
        .pipe(z.email({ error: "Enter a valid email address, like you@university.edu." })),
    ),
  university: z
    .string()
    .transform(clean)
    .pipe(
      z
        .string()
        .min(2, { error: "Tell us which university you attend." })
        .max(120, { error: "Please shorten the university name." })
        // Letters (any language), numbers, spaces and everyday punctuation only.
        .regex(/^[\p{L}\p{M}\p{N} .,'&()\-\u2013/]+$/u, {
          error: "Use letters, numbers and basic punctuation for the university name.",
        }),
    ),
  interests: z.array(z.enum(["dating", "friendship", "mentorship"])).max(3),
  marketingConsent: z.boolean(),
  confirmedAdultStudent: z.literal(true, {
    error: "Please confirm you're 18 or older and a current university student.",
  }),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
