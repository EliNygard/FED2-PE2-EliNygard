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

export const venueFormSchema = z.object({
  name: z
    .string()
    .min(3, "A venue name must be at least 3 characters.")
    .nonempty("Venue name is required."),
  description: z
    .string()
    .min(10, "The description must be at least 10 characters")
    .nonempty("A description of the venue is required."),
  media: z.array(
    z.object({
      url: z
        .string()
        .url("The image must be a valid URL.")
        .startsWith("https://", { message: "Must provide secure URL" }),
      alt: z.string(),
    })
  ),
  rate: z.coerce
    .number({ invalid_type_error: "You must set a price per night." })
    .min(0, "The price must be 0 or greater."),
  guests: z.coerce
    .number({ invalid_type_error: "The maximum amount of guests is required." })
    .int("Please enter a number")
    .min(1, "You must accommodate for at least one guest."),
  meta: z.array(z.string()),
  location:
    z.object({
      address: z.string(),
      city: z.string(),
      zip: z.string(),
      country: z.string(),
    })
  ,
});

export type VenueFormValues = z.infer<typeof venueFormSchema>;
