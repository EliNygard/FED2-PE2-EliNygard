import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IVenue } from "@/interface";
import { dateFormat } from "@/utils/dateFormat";

/**
 * BookingsAccordion displays info to the venue manager about each booking made on a specific venue:
 * - The customers name
 * - The guests count
 * - The booked dates
 * - The customer's email address
 *
 * - The component is part of the MyVenueCard.
 * @param venue The venue data.
 */

export default function BookingsAccordion({ venue }: { venue: IVenue }) {
  const bookings = venue.bookings;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Bookings on this venue</AccordionTrigger>
        <AccordionContent>
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id} className="mb-8">
                <article>
                  <p className="text-sm md:text-base">{`Customer: ${booking.customer.name}`}</p>
                  <p className="text-sm md:text-base">{`Guests: ${booking.guests}`}</p>
                  <p className="text-sm md:text-base">
                    {`Booked dates: ${dateFormat(booking.dateFrom)} - ${dateFormat(booking.dateTo)}`}
                  </p>
                  <p className="text-sm md:text-base">
                    {`Contact: ${booking.customer.email}`}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
