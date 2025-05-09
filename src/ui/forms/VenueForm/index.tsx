// Reference on useFieldArray: https://youtu.be/4MrbfGSFY2A

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
import { venueFormSchema, VenueFormValues } from "@/lib/schemas";
import Button from "@/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

const meta = [
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

/**
 * VenueForm component.
 *
 * Renders a venue form with the fields: name, description, images, price, guests, facilities and location details.
 * The form handles validation with zod.
 *
 * @component
 */

export default function VenueForm() {
  const form = useForm<VenueFormValues>({
    resolver: zodResolver(venueFormSchema),
    defaultValues: {
      name: "",
      description: "",
      media: [
        {
          url: "",
          alt: "",
        },
      ],
      rate: 0,
      guests: 1,
      meta: [],
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "media",
    control: form.control,
    rules: {
      required: "Please add at least one image of your venue",
    },
  });

  function onSubmit(data: VenueFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Venue Name */}

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

        <FormLabel>Add images of your venue</FormLabel>
        <FormDescription>
          Show off your space! Upload a few photos that capture the unique style
          and inviting atmosphere of your venue.
        </FormDescription>

        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <FormField
                control={form.control}
                name={`media.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Image ${index + 1}`}</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`media.${index}.alt`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Describe image ${index + 1}`}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.length > 1 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => {
            append({
              url: "",
              alt: "",
            });
          }}
        >
          Add image
        </button>

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
          name="meta"
          render={() => (
            <FormItem>
              <FormLabel>Facilities at your venue</FormLabel>
              <FormDescription>
                Select the amenities that make your venue extra inviting. Check
                all that apply.
              </FormDescription>
              {meta.map((m) => (
                <FormField
                  key={m.id}
                  control={form.control}
                  name="meta"
                  render={({ field }) => {
                    return (
                      <FormItem key={m.id}>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(m.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, m.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value === m.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{m.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}

        <FormLabel>Location details</FormLabel>
        <FormDescription>Enter your venue&apos;s address</FormDescription>

        <FormField
          control={form.control}
          name="location.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location.zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
