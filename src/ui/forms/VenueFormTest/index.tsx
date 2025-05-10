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

export default function VenueFormTest() {
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  //   control,
  // } = useForm<VenueFormValues>({
  //   resolver: zodResolver(venueFormSchema),
  //   defaultValues: {
  //     name: "",
  //     description: "",
  //     media: [
  //       {
  //         url: "",
  //         alt: "",
  //       },
  //     ],
  //   },
  // });
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

  const { register } = form;

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
            <section key={field.id}>
              <label htmlFor="url">
                <span>Image</span>
                <input id="url" {...register(`media.${index}.url`)} />
              </label>
              <label htmlFor="alt">
                <span>Image description</span>
                <input id="alt" {...register(`media.${index}.alt`)} />
              </label>
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </section>
          );
        })}

        <button
          type="button"
          onClick={() => {
            append({
              url: "abc",
              alt: "",
            });
          }}
        >
          Append
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
// <div>
//   <form onSubmit={handleSubmit(onSubmit)}>
//     <label>
//       <span>Name</span>
//       <input type="text" placeholder="Venue Name" {...register("name")} />
//     </label>
//     <label>
//       <span>Description</span>
//       <input
//         type="text"
//         placeholder="Venue Description"
//         {...register("description")}
//       />
//     </label>
//     {fields.map((field, index) => {
//       return (
//         <section key={field.id}>
//           <label>
//             <span>Image</span>
//             <input {...register(`media.${index}.url`)} />
//           </label>
//           <label>
//             <span>Image description</span>
//             <input {...register(`media.${index}.alt`)} />
//           </label>
//           <button type="button" onClick={() => remove(index)}>
//             Remove
//           </button>
//         </section>
//       );
//     })}
//     <button
//       type="button"
//       onClick={() => {
//         append({
//           url: "abc",
//           alt: "",
//         });
//       }}
//     >
//       Append
//     </button>
//     <p>{errors.media?.root?.message}</p>
//     <button type="submit">Submit</button>
//   </form>
// </div>
// );
// }

// "use client";

// // import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// import Button from "@/ui/Button";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useFieldArray, useForm } from "react-hook-form";

// const venueFormSchema = z.object({
//   venue: z.object({
//     name: z
//       .string()
//       .nonempty("A venue name is required.")
//       .min(3, "The venue name must be at least 3 characters"),
//     description: z
//       .string()
//       .nonempty("A description of the venue is required.")
//       .min(10, "Description must be at least 10 characters"),
//     images: z.array(z.string().url("Image must be a valid URL")),
//     rate: z.coerce
//       .number({ invalid_type_error: "You must set a price per night." })
//       .min(0, "The price must be 0 or greater"),
//     guests: z.coerce
//       .number({
//         invalid_type_error: "The maximum amount of guests is required.",
//       })
//       .int("Guests must be a number")
//       .min(1, "You must accommodate for at least one guest."),
//     items: z.array(z.string()),
//   }),
// });

// export default function VenueFormTest() {
//   const form = useForm<z.infer<typeof venueFormSchema>>({
//     resolver: zodResolver(venueFormSchema),
//     defaultValues: {
//       venue: {
//         name: "",
//         description: "",
//         rate: "",
//         guests: "",
//         items: [],
//         images: [""],
//       },
//     },
//   });

//   const { fields, append, remove } = useFieldArray<
//     z.infer<typeof venueFormSchema>, 'venue.images'
//   >({
//     name: "venue.images",
//     control: form.control,
//   });

//   function onSubmit(values: z.infer<typeof venueFormSchema>) {
//     console.log(values);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         {/* …existing fields… */}

//         {/* Image URLs */}
//         <FormLabel>
//           Image URLs
//           <span aria-hidden="true">*</span>
//         </FormLabel>
//         <FormDescription>
//           Provide up to five image URLs for your venue.
//         </FormDescription>
//         {fields.map((field, index) => (
//           <FormField
//             key={field.id}
//             control={form.control}
//             name={`venue.images.${index}`}
//             render={({ field }) => (
//               <FormItem className="flex items-center space-x-2">
//                 <FormControl>
//                   <Input {...field} placeholder={`Image URL #${index + 1}`} />
//                 </FormControl>
//                 {fields.length > 1 && (
//                   <Button type="button" onClick={() => remove(index)}>
//                     Remove
//                   </Button>
//                 )}
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         ))}
//         <Button
//           type="button"
//           onClick={() => append("")}
//           disabled={fields.length >= 5}
//         >
//           Add another URL
//         </Button>

//         {/* Submit */}
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }
