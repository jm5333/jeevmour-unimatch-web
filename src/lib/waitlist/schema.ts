import "server-only";
import { z } from "zod";

export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { error: "Enter your email address." })
    .max(254, { error: "That email address is too long." })
    .pipe(z.email({ error: "Enter a valid email address, like you@university.edu." })),
  university: z
    .string()
    .trim()
    .min(2, { error: "Tell us which university you attend." })
    .max(120, { error: "Please shorten the university name." }),
  interests: z.array(z.enum(["dating", "friendship", "mentorship"])).max(3),
  marketingConsent: z.boolean(),
  confirmedAdultStudent: z.literal(true, {
    error: "Please confirm you're 18 or older and a current university student.",
  }),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
