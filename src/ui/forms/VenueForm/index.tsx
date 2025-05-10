// Reference on useFieldArray: https://youtu.be/4MrbfGSFY2A

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { venueFormSchema, VenueFormValues } from "@/lib/schemas";
import Button from "@/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { StyledFieldset, StyledVenueForm } from "./index.styles";

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
        <StyledVenueForm>
          {/* Venue Name */}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <label>
                  The name of the venue
                  <span aria-hidden="true"> *</span>
                  <span className="sr-only">(required)</span>
                </label>
                <p>
                  Pick a memorable name that captures your venue&apos;s unique
                  charm.
                </p>
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
                <label>
                  Description
                  <span aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <p>
                  Share a brief overview highlighting your venue&apos;s key
                  features and inviting atmosphere.
                </p>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Images */}

          <StyledFieldset>
            {/* <StyledLegend> */}
            {/* <FormItem> */}
            <h3>Add images of your venue</h3>
            <p>
              Show off your space! Upload a few photos that capture the unique
              style and inviting atmosphere of your venue. We reccomend minimum five images.
            </p>
            {/* </FormItem> */}
            {/* </StyledLegend> */}

            {fields.map((field, index) => {
              return (
                <div key={field.id} className="grid gap-2 mb-2">
                  <FormField
                    control={form.control}
                    name={`media.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <label>{`Image ${index + 1}`}</label>
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
                        <label>{`Describe image ${index + 1}`}</label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 1 && (
                    <div className="w-1/3">
                      <Button
                        $variant="narrow"
                        className="bg-primary-font"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}

            <Button
              type="button"
              $variant="narrow"
              className="bg-brand-blue"
              onClick={() => {
                append({
                  url: "",
                  alt: "",
                });
              }}
            >
              Add new image
            </Button>
          </StyledFieldset>

          {/* Price per night */}

          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <label>
                  Price per night
                  <span aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <p>
                  Enter the base rate each guest will pay per night. This helps
                  set clear financial expectations for your bookings.
                </p>
                <FormControl>
                  <Input type="number" {...field} className="w-1/3" />
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
                <label>
                  Maximum number of guests
                  <span aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <p>
                  Specify the highest number of people your venue can
                  comfortably accommodate. This allows you to manage capacity
                  and ensures a safe, enjoyable experience.
                </p>
                <FormControl>
                  <Input type="number" {...field} className="w-1/3" />
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
                <label>Facilities at your venue</label>
                <p>
                  Select the amenities that make your venue extra inviting.
                  Check all that apply.
                </p>
                {meta.map((m) => (
                  <FormField
                    key={m.id}
                    control={form.control}
                    name="meta"
                    render={({ field }) => {
                      return (
                        <FormItem key={m.id} className="flex flex-row gap-3 items-center justify-start">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(m.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, m.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== m.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <label>{m.label}</label>
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

          <StyledFieldset>
            <h3>Location details</h3>
            <p>Enter your venue&apos;s address</p>

            <FormField
              control={form.control}
              name="location.address"
              render={({ field }) => (
                <FormItem>
                  <label>Street</label>
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
                  <label>City</label>
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
                  <label>Zip code</label>
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
                  <label>Country</label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </StyledFieldset>

          <Button type="submit">Submit</Button>
        </StyledVenueForm>
      </form>
    </Form>
  );
}
