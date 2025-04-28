"use client";

import { IVenue } from "@/interface";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

// TODO:
// calculate total ✅
// verification: must select min one night + error message
// store selected dates, nights, guests, price, total
// add buttons, disable if no token
// style calendar border
// create booking confirmation

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
        
        <div className="uppercase" style={{ fontWeight: 500 }}>
          {amountBookedNights ? `Total ${totalCost} NOK` : " "}
        </div>
      </div>
    </section>
  );
}
