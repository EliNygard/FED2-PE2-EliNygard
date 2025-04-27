"use client";

import { Calendar } from "@/components/ui/calendar";
import { IVenue } from "@/interface";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function VenueCalendar({ venue }: { venue: IVenue }) {
  const [date, setDate] = useState<DateRange | undefined>();
  const bookings = venue.bookings;
  console.log(bookings);
  console.log(date);

  const handleSelect = (newSelected: DateRange | undefined) => {
    setDate(newSelected);
  };

  return (
    <Calendar
      mode="range"
      selected={date}
      disabled={{ before: new Date() }}
      onSelect={handleSelect}
      className="rounded-md border"
    />
  );
}
