"use client";

import { IVenue } from "@/interface";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

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
  // const total = pricePerNight * amountBookedNights;
  // console.log(total);

  // verification: must select min one night
  if (selectedDate?.to === selectedDate?.from) {
    console.log("please select min one night");
  }

  if (amountBookedNights) {
    const totalCost = pricePerNight * amountBookedNights;
    console.log(totalCost);
  }

  console.log(selectedDate);
  // console.log(date?.from?.getTime());
  // console.log(date?.to?.getTime());

  return (
    <>
      <h2 className="mb-4">Select dates to see the price</h2>
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
      <div>{amountBookedNights ? `Total NOK` : " "}</div>
    </>
  );
}
