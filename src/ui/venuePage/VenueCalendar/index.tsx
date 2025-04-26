"use client"

import { DateRange, DayPicker } from "react-day-picker"

import { IVenue } from "@/interface"
import { useState } from "react"

export function VenueCalendar({ venue }: { venue: IVenue }) {
  const [date, setDate] = useState<DateRange | undefined>()
  const bookings = venue.bookings
  console.log(bookings);
  console.log(date);
  

  const handleSelect = (newSelected:DateRange | undefined) => {
    setDate(newSelected)
  }
  
  return (
    <DayPicker
    className="rounded-md border shadow"
      mode="range"
      selected={date}
      disabled={{ dayOfWeek: [0,6], before: new Date() }}
      excludeDisabled
      onSelect={handleSelect}
    />
  )
}
