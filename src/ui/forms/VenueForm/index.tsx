"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const venueFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  rate: z.number(),
  guests: z.number(),
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
    },
  });

  function onSubmit(values: z.infer<typeof venueFormSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <Input placeholder="Name of the venue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h2>Add images of your venue</h2>
          <FormDescription>
            <p>
              Show off your space! Upload a few photos that capture the unique
              style and inviting atmosphere of your venue.
            </p>
            <p className="image-link">The image must be a valid url link</p>
          </FormDescription>

          <div>
            <FormLabel htmlFor="img">Image</FormLabel>
            <Input type="text" placeholder="Image link" />
          </div>
          <div>
            <FormLabel htmlFor="img">Image</FormLabel>
            <Input type="text" placeholder="Image link" />
          </div>
          <div>
            <FormLabel htmlFor="img">Image</FormLabel>
            <Input type="text" placeholder="Image link" />
          </div>
          <div>
            <FormLabel htmlFor="img">Image</FormLabel>
            <Input type="text" placeholder="Image link" />
          </div>
          <div>
            <FormLabel htmlFor="img">Image</FormLabel>
            <Input type="text" placeholder="Image link" />
          </div>
        </div>

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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Maximum number of guests
                  <span aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </FormLabel>
                <FormDescription>
                  Specify the highest number of people your venue can
                  comfortably accommodate. This allows you to manage capacity
                  and ensures a safe, enjoyable experience.
                </FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel htmlFor="facilities">Facilities at your venue</FormLabel>
          <FormDescription>
            Select the amenities that make your venue extra inviting. Check all
            that apply.
          </FormDescription>
        </div>
      </form>
    </Form>
  );
}
