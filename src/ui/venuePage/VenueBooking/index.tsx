"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
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

import { IVenue } from "@/interface";
import Button from "@/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";

// TODO:
// calculate total ✅
// verification: must select min one night + error message ✅
// store selected dates, nights, guests, price, total ✅
// add buttons, disable if no token
// style calendar border
// create booking confirmation - change to dialog
// send request
// move Schema to sep folder/file

const BookFormSchema = z.object({
  guests: z
    .string({
      required_error: "Please select how many guests.",
    })
    .min(1, { message: "Please select how many guests." }),
  dateRange: z
    .object({
      from: z.string({ required_error: "Please select a check-in date." }),
      to: z.string({ required_error: "Please select a check-out date." }),
    })
    .refine(({ from, to }) => differenceInCalendarDays(to, from) >= 1, {
      message: "Please select at least one night.",
    }),
});

type FormValues = z.infer<typeof BookFormSchema>;

export default function VenueBooking({ venue }: { venue: IVenue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingData, setBookingData] = useState<{
    from: string;
    to: string;
    guests: number;
    nights: number;
    totalCost: number;
  } | null>(null);

  const maxGuests = venue.maxGuests;
  const bookings = venue.bookings;
  console.log(bookings);
  const bookedPeriods = bookings.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  const form = useForm<FormValues>({
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
  const guests = watch("guests");
  const nights = from && to ? differenceInCalendarDays(to, from) : 0;
  const totalCost = nights * pricePerNight;

  function onSubmit(values: FormValues) {
    setBookingData({
      from: values.dateRange.from,
      to: values.dateRange.to,
      guests: Number(values.guests),
      nights,
      totalCost,
    });
    setIsOpen(true);
    // const { from, to, guests } = values.dateRange
    //   ? {
    //       from: values.dateRange.from,
    //       to: values.dateRange.to,
    //       guests: +values.guests,
    //     }
    //   : {};

    // toast(
    //   <>
    //     <div>
    //       <p>{`Dates: ${from?.toDateString()} - ${to?.toDateString()}`}</p>
    //       <p>{`Nights: ${nights}`}</p>
    //       <p>{`Guests: ${guests}`}</p>
    //       <p>{`Rate: ${pricePerNight}`}</p>
    //       <p>{`Total Cost: ${totalCost}`}</p>
    //     </div>
    //     <Button onClick={() => toast(
    //        <div className="border border-primary-font rounded-xl p-3">
    //        <p>Booking confirmed!</p>
    //        <p>Thank you for choosing Holidaze. Enjoy your stay!</p>
    //      </div>
    //     )}>Book your stay</Button>
    //     <Button>Cancel</Button>
    //   </>,

    // );
  }

  return (
    <>
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
                            field.onChange({
                              from: range?.from,
                              to: range?.to,
                            });
                          }
                        }}
                        modifiers={{ booked: bookedPeriods }}
                        modifiersClassNames={{
                          booked: "bg-red-200 cursor-not-allowed",
                        }}
                      />
                    </div>
                    <FormMessage />
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
                            {guests > 1
                              ? `${guests}  guests`
                              : `${guests} guest`}
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking confirmation</DialogTitle>
            <DialogDescription>
              Thank you for choosing to stay with us! Please review your
              reservation details:
            </DialogDescription>
          </DialogHeader>

          {bookingData && (
            <div className="space-y-2 py-4">
              <p>
                Dates: {bookingData.from} - {bookingData.to}
              </p>
              <p>Nights: {bookingData.nights}</p>
              <p>Guests: {bookingData.guests}</p>
              <p style={{ fontWeight: 500 }}>
                Total cost: {bookingData.totalCost} NOK
              </p>
            </div>
          )}

          <DialogFooter className="space-x-2"></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
