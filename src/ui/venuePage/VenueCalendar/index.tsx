"use client";

import { IVenue } from "@/interface";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

export default function VenueCalendar({ venue }: { venue: IVenue }) {
  const [date, setDate] = useState<DateRange | undefined>();
  const bookings = venue.bookings;
  const bookedPeriods = bookings.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  const handleSelect = (newSelected: DateRange | undefined) => {
    setDate(newSelected);
  };

  const amountNights =
    date?.from && date?.to
      ? differenceInCalendarDays(date.to, date.from) + 1
      : undefined;

  console.log(amountNights);

  const pricePerNight = venue.price
  if (amountNights) {
    const totalCost = pricePerNight * amountNights
    console.log(totalCost);
  }
  

  console.log(date);
  // console.log(date?.from?.getTime());
  // console.log(date?.to?.getTime());

  return (
    <>
      <h2 className="mb-4">Select dates to see the price</h2>
      <div className="rounded-lg border-brand-blue border p-2 w-full overflow-x-auto calendar-container">
        <DayPicker
          mode="range"
          selected={date}
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
      <div>{amountNights ? `Total` : "Select dates"}</div>
    </>
  );
}
