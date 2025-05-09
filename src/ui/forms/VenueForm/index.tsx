"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const items = [
  {
    id: "wifi",
    label: "Wifi",
  },
  {
    id: "parking",
    label: "Parking",
  },
  {
    id: "breakfast",
    label: "Breakfast",
  },
  {
    id: "pets",
    label: "Pets",
  },
] as const;

const venueFormSchema = z.object({
  name: z
    .string()
    .nonempty("A venue name is required.")
    .min(3, "The venue name must be at least 3 characters"),
  description: z
    .string()
    .nonempty("A description of the venue is required.")
    .min(10, "Description must be at least 10 characters"),
  // images: z.array(z.string().url("Image must be a valid URL")),
  rate: z.coerce
    .number({ invalid_type_error: "You must set a price per night." })
    .min(0, "The price must be 0 or greater"),
  guests: z.coerce
    .number({ invalid_type_error: "The maximum amount of guests is required." })
    .int("Guests must be a number")
    .min(1, "You must accommodate for at least one guest."),
  items: z.array(z.string()),
});

/**
 * VenueForm component.
 *
 * Renders a venue form with the fields: name, description, images, price, guests, facilities and location details.
 * The form handles validation with zod.
 *
 * @component
 */

export default function VenueForm() {
  const form = useForm<z.infer<typeof venueFormSchema>>({
    resolver: zodResolver(venueFormSchema),
    defaultValues: {
      name: "",
      description: "",
      rate: 0,
      guests: 1,
      items: [],
    },
  });


  function onSubmit(values: z.infer<typeof venueFormSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Venue name */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                The name of the venue
                <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </FormLabel>
              <FormDescription>
                Pick a memorable name that captures your venue&apos;s unique
                charm.
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description
                <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </FormLabel>
              <FormDescription>
                Share a brief overview highlighting your venue&apos;s key
                features and inviting atmosphere.
              </FormDescription>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Images */}

        

        {/* Price per night */}

        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Price per night
                <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </FormLabel>
              <FormDescription>
                Enter the base rate each guest will pay per night. This helps
                set clear financial expectations for your bookings.
              </FormDescription>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Guests */}

        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Maximum number of guests
                <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </FormLabel>
              <FormDescription>
                Specify the highest number of people your venue can comfortably
                accommodate. This allows you to manage capacity and ensures a
                safe, enjoyable experience.
              </FormDescription>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Facilities */}

        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <FormLabel>Facilities at your venue</FormLabel>
              <FormDescription>
                Select the amenities that make your venue extra inviting. Check
                all that apply.
              </FormDescription>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem key={item.id}>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value === item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
