"use client";

import { Calendar } from "@/components/ui/calendar";
import { IVenue } from "@/interface";
import { useState } from "react";
import { DateRange } from "react-day-picker";

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
      <Calendar
        mode="range"
        selected={date}
        disabled={[{ before: new Date() }, ...bookedPeriods]}
        excludeDisabled
        onSelect={handleSelect}
        className="rounded-md border"
      />
      <div>{date ? `Selected date: ${date}` : "Select dates"}</div>
    </>
  );
}
