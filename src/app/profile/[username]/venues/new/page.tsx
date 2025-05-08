import VenueForm from "@/ui/forms/VenueForm";

/**
 * CreateVenuePage displays the form where a venue manager can create a new venue.
 *
 * - Renders <VenueForm>
 */

export default function CreateVenuePage() {
  return (
    <section>
    <h1>Create new venue</h1>
    <VenueForm />
    </section>

  )
}