"use client";

import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";

// TODO:
// calculate total ✅
// verification: must select min one night + error message
// store selected dates, nights, guests, price, total
// add buttons, disable if no token
// style calendar border
// create booking confirmation

const BookFormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

export default function VenueCalendar({ venue }: { venue: IVenue }) {
  const [selectedDate, setDate] = useState<DateRange | undefined>();

  const bookings = venue.bookings;
  const bookedPeriods = bookings.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  const handleSelect = (newSelected: DateRange | undefined) => {
    setDate(newSelected);
  };

  const amountBookedNights =
    selectedDate?.from && selectedDate?.to
      ? differenceInCalendarDays(selectedDate.to, selectedDate.from)
      : undefined;

  const pricePerNight = venue.price;

  const totalCost = amountBookedNights
    ? pricePerNight * amountBookedNights
    : null;

  if (selectedDate?.to === selectedDate?.from) {
    console.log("please select min one night");
  }

  if (amountBookedNights) {
    const totalCost = pricePerNight * amountBookedNights;
    console.log(totalCost);
  }

  console.log(selectedDate);
  console.log(selectedDate?.from?.toLocaleDateString());
  console.log(selectedDate?.to?.toLocaleDateString());

  const form = useForm<z.infer<typeof BookFormSchema>>({
    resolver: zodResolver(BookFormSchema),
  });

  function onSubmit(data: z.infer<typeof BookFormSchema>) {
    toast(`Submitted: ${JSON.stringify(data, null, 2)}`, {
      description: `${totalCost}`,
      action: {
        label: "OK",
        onClick: () => toast("Thank you"),
      },
    });
  }

  return (
    <section>
      <h2>Select dates to see the price</h2>
      <div className="mt-4 flex flex-col gap-5">
        <div className="rounded-lg border-brand-blue border p-2 w-full overflow-x-auto calendar-container">
          <DayPicker
            mode="range"
            selected={selectedDate}
            disabled={[{ before: new Date() }, ...bookedPeriods]}
            excludeDisabled
            numberOfMonths={1}
            onSelect={handleSelect}
            modifiers={{ booked: bookedPeriods }}
            modifiersClassNames={{
              booked: "bg-red-200 cursor-not-allowed",
            }}
          />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
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
          {amountBookedNights ? `Total ${totalCost} NOK` : " "}
        </div>
      </div>
    </section>
  );
}
