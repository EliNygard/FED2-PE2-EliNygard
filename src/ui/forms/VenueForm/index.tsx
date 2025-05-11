// Reference on useFieldArray: https://youtu.be/4MrbfGSFY2A

// "use client";

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
import Image from "next/image";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  StyledFieldset,
  StyledImageItem,
  StyledVenueForm,
} from "./index.styles";

interface VenueFormProps {
  initialValues?: VenueFormValues;
  onSubmit: (values: VenueFormValues) => Promise<void> | void;
  submitLabel: string;
  isLoading: boolean;
}

/**
 * VenueForm component.
 *
 * Renders a venue form with the fields: name, description, images, price, guests, facilities and location details.
 * The form handles validation with zod.
 *
 * @component
 */

export default function VenueForm({
  initialValues,
  onSubmit,
  submitLabel,
  isLoading,
}: VenueFormProps) {
  const form = useForm<VenueFormValues>({
    resolver: zodResolver(venueFormSchema),
    defaultValues: {
      name: "",
      description: "",
      media: [{ url: "", alt: "" }],
      price: 0,
      maxGuests: 1,
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
      },
    },
  });

  const { reset } = form;

  const { fields, append, remove } = useFieldArray({
    name: "media",
    control: form.control,
    rules: {
      required: "Please add at least one image of your venue",
    },
  });

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  async function handle(data: VenueFormValues) {
    // console.log(data);
    await onSubmit(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <StyledVenueForm onSubmit={form.handleSubmit(handle)}>
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
          <h3>Add images of your venue</h3>
          <p>
            Show off your space! Upload a few photos that capture the unique
            style and inviting atmosphere of your venue.
          </p>

          {fields.map((field, index) => {
            return (
              <StyledImageItem key={field.id}>
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

                      {/* Image preview and remove image button */}

                      <div className="flex flex-row justify-between mt-2">
                        {field.value && (
                          <div className="relative h-16 md:h-20 aspect-video overflow-hidden rounded-md">
                            <Image
                              src={field.value}
                              alt={`Preview of image ${index + 1}`}
                              fill
                              sizes="30vw"
                              style={{
                                objectFit: "cover",
                                overflow: "hidden",
                                borderRadius: "6px",
                                aspectRatio: "inherit",
                              }}
                            />
                          </div>
                        )}

                        {fields.length > 1 && (
                          <div className="max-w-24">
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
              </StyledImageItem>
            );
          })}

          <div className="max-w-3xs mt-4">
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
          </div>
        </StyledFieldset>

        {/* Price per night */}

        <FormField
          control={form.control}
          name="price"
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
          name="maxGuests"
          render={({ field }) => (
            <FormItem>
              <label>
                Maximum number of guests
                <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <p>
                Specify the highest number of people your venue can comfortably
                accommodate. This allows you to manage capacity and ensures a
                safe, enjoyable experience.
              </p>
              <FormControl>
                <Input type="number" {...field} className="w-1/3" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Facilities */}

        <FormItem>
          <label>Facilities at your venue</label>
          <p>
            Select the amenities that make your venue extra inviting. Check all
            that apply.
          </p>

          <FormField
            control={form.control}
            name="meta"
            render={({ field }) => (
              <>
                {(["wifi", "parking", "breakfast", "pets"] as const).map(
                  (key) => (
                    <FormItem
                      key={key}
                      className="flex flex-row gap-3 items-center justify-start capitalize"
                    >
                      <FormControl>
                        <Checkbox
                          key={key}
                          checked={field.value[key]}
                          onCheckedChange={(checked) => {
                            field.onChange({
                              ...field.value,
                              [key]: checked,
                            });
                          }}
                        />
                      </FormControl>
                      <label>{key}</label>
                      <FormMessage />
                    </FormItem>
                  )
                )}
              </>
            )}
          />
        </FormItem>

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
        <div className="lg:w-72">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading" : `${submitLabel}`}
          </Button>
        </div>
      </StyledVenueForm>
    </Form>
  );
}
