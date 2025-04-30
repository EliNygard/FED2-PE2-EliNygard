"use client";

import {
  Dialog,
  DialogClose,
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
import { useCreateBooking } from "@/hooks/useCreateBooking";

import { ICreateBooking, IVenue } from "@/interface";
import Button from "@/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { differenceInCalendarDays } from "date-fns";
import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// TODO:
// calculate total ✅
// verification: must select min one night + error message ✅
// store selected dates, nights, guests, price, total ✅
// add buttons, disable if no token
// create booking confirmation - change to dialog ✅
// send request
// move Schema to sep folder/file

const BookFormSchema = z.object({
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

type FormValues = z.infer<typeof BookFormSchema>;

export default function VenueBooking({ venue }: { venue: IVenue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingData, setBookingData] = useState<{
    from: string;
    to: string;
    guests: string;
    nights: number;
    totalCost: number;
  } | null>(null);

  const venueId = venue.id;
  const maxGuests = venue.maxGuests;
  const bookings = venue.bookings;
  const bookedPeriods = bookings.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  const form = useForm<FormValues>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      guests: 1,
      dateRange: {
        from: new Date(),
        to: undefined,
      },
    },
  });

  const { watch, handleSubmit } = form;

  const { dateRange } = watch();
  const nights = useMemo(
    () =>
      dateRange.from && dateRange.to
        ? differenceInCalendarDays(dateRange.to, dateRange.from)
        : 0,
    [dateRange]
  );
  const pricePerNight = venue.price;
  const totalCost = nights * pricePerNight;

  const { createBooking, isSuccess } = useCreateBooking();

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setBookingData({
      from: values.dateRange.from.toDateString(),
      to: values.dateRange.to.toDateString(),
      guests: values.guests.toString(),
      nights,
      totalCost,
    });

    setIsOpen(true);
  };

  const onConfirm: SubmitHandler<FormValues> = async (values) => {
    const payload: ICreateBooking = {
      dateFrom: values.dateRange.from.toISOString(),
      dateTo: values.dateRange.to.toISOString(),
      guests: values.guests,
      venueId: venueId,
    };

    console.log(payload);

    await createBooking(payload);
    setIsOpen(false);

    if (isSuccess) {
      toast(
        <div className="border border-primary-font rounded-xl p-3">
          <p>Booking confirmed!</p>
          <p>Thank you for choosing Holidaze. Enjoy your stay!</p>
        </div>
      )
  } else {
    toast(
      <div>Unfortunately something went wrong when booking this venue. Please try again.</div>
    )
  }}

  return (
    <>
      <section className="md:shadow-lg/20 md:shadow-brand-blue/50 md:p-3 md:rounded-md max-w-[339px]">
        <h2>Select dates to see the price</h2>
        <div className="mt-4 flex flex-col gap-5">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Calendar field */}
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Calendar</FormLabel>
                    <div className="rounded-lg border-brand-blue border p-2 overflow-x-auto calendar-container ">
                      <DayPicker
                        mode="range"
                        selected={{
                          from: field.value.from,
                          to: field.value.to,
                        }}
                        disabled={[{ before: new Date() }, ...bookedPeriods]}
                        excludeDisabled
                        numberOfMonths={1}
                        onSelect={(range) => field.onChange(range!)}
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
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="sr-only">Select guests</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={`${field.value}`}
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
              <Button type="submit">Continue</Button>
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

          <DialogFooter className="gap-6">
            <Button onClick={handleSubmit(onConfirm)}>Confirm</Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
