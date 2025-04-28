"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { IVenue } from "@/interface";
import Button from "@/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInCalendarDays } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";

// TODO:
// calculate total ✅
// verification: must select min one night + error message ✅
// store selected dates, nights, guests, price, total
// add buttons, disable if no token
// style calendar border
// create booking confirmation

const BookFormSchema = z.object({
  guests: z
    .string({
      required_error: "Please select how many guests.",
    })
    .min(1, { message: "Please select how many guests." }),
  dateRange: z
    .object({
      from: z.date({ required_error: "Please select a check-in date." }),
      to: z.date({ required_error: "Please select a check-out date." }),
    })
    .refine(({ from, to }) => differenceInCalendarDays(to, from) >= 1, {
      message: "Please select at least one night.",
    }),
});

export default function VenueBooking({ venue }: { venue: IVenue }) {
  const maxGuests = venue.maxGuests;
  const bookings = venue.bookings;
  console.log(bookings);
  const bookedPeriods = bookings.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  const form = useForm<z.infer<typeof BookFormSchema>>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      guests: "",
      dateRange: { from: new Date(), to: new Date() },
    },
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = form;

  const pricePerNight = venue.price;
  const { from, to } = watch("dateRange");
  const nights = from && to ? differenceInCalendarDays(to, from) : 0;
  const totalCost = nights * pricePerNight;

  function onSubmit(values: z.infer<typeof BookFormSchema>) {
    toast(
      <>
        <div>
          <p>{`Dates: ${from.toDateString()} - ${to.toDateString}`}</p>
          <p>{`Nights: ${nights}`}</p>
          <p>{`Guests: ${values.guests}`}</p>
          <p>{`Rate: ${pricePerNight}`}</p>
          <p>{`Total Cost: ${totalCost}`}</p>
        </div>
        <Button onClick={() => toast('Thank you')}>Book your stay</Button>
        <Button>Cancel</Button>
      </>,
      {
          action: {
          label: "Confirm",
          onClick: () => toast("Thank you"),
        },
      }
    );
  }

  return (
    <section>
      <h2>Select dates to see the price</h2>
      <div className="mt-4 flex flex-col gap-5">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Calendar field */}
            <FormField
              control={control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Calendar</FormLabel>
                  <div className="rounded-lg border-brand-blue border p-2 w-full overflow-x-auto calendar-container">
                    <DayPicker
                      mode="range"
                      selected={field.value}
                      disabled={[{ before: new Date() }, ...bookedPeriods]}
                      excludeDisabled
                      numberOfMonths={1}
                      onSelect={(range?: DateRange) => {
                        if (range?.from && range?.to) {
                          field.onChange(range);
                        } else {
                          field.onChange({ from: range?.from, to: range?.to });
                        }
                      }}
                      modifiers={{ booked: bookedPeriods }}
                      modifiersClassNames={{
                        booked: "bg-red-200 cursor-not-allowed",
                      }}
                    />
                  </div>
                  <FormMessage />
                  {/* {errors.range && (
                <span aria-live="polite">
                  {errors.range.message}
                </span>
              )} */}
                </FormItem>
              )}
            />

            {/* Select guests field */}
            <FormField
              control={control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Select guests</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Guests" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from(
                        { length: maxGuests },
                        (_, index) => index + 1
                      ).map((guests) => (
                        <SelectItem key={guests} value={guests.toString()}>
                          {guests > 1 ? `${guests}  guests` : `${guests} guest`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={Object.keys(errors).length > 0}>
              Continue
            </Button>
          </form>
        </Form>

        <div className="uppercase" style={{ fontWeight: 500 }}>
          {nights ? `Total ${totalCost} NOK` : " "}
        </div>
      </div>
    </section>
  );
}
