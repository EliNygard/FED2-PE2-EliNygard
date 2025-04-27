"use client";

import { IVenue } from "@/interface";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

export default function VenueCalendar({ venue }: { venue: IVenue }) {
  const [date, setDate] = useState<DateRange | undefined>();
  const bookings = venue.bookings;
  const bookedPeriods = bookings.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date (booking.dateTo)
  }))


  
  console.log(bookings);
  console.log(date);
  console.log(date?.from?.toISOString());
  console.log(date?.to?.toISOString());

  const handleSelect = (newSelected: DateRange | undefined) => {
    setDate(newSelected);
  };

  return (
    <>
    <div className="rounded-lg border-brand-blue w-full overflow-x-auto p-0.5 calendar-container">

      <DayPicker
        mode="range"
        selected={date}
        disabled={[{ before: new Date() }, ...bookedPeriods]}
        excludeDisabled
        numberOfMonths={1}
        onSelect={handleSelect}
        // className="rounded-md border"
        />
        </div>
      <div>{date ? `Selected date: ${date}` : "Select dates"}</div>
    </>
  );
}
