import { differenceInCalendarDays } from "date-fns";
import { z } from "zod";

export const BookFormSchema = z.object({
  guests: z.coerce
    .number()
    .min(1, { message: "Please select at least one guest" }),
  dateRange: z
    .object({
      from: z.date({ required_error: "Please select a check-in date." }),
      to: z.date({ required_error: "Please select a check-out date." }),
    })
    .refine(({ from, to }) => differenceInCalendarDays(to, from) >= 1, {
      message: "Please select at least one night.",
    }),
});

export type FormValues = z.infer<typeof BookFormSchema>;