import CreateFormWrapper from "@/ui/CreateFormWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create a new venue | Holidaze',
  description: 'Creates a new venue for customers to book a stay',
}

/**
 * CreateVenuePage holds the form wrapper, which displays the form where a venue manager can create a new venue.
 *
 * - Renders <CreateFormWrapper>
 */

export default function CreateVenuePage() {
  return (
    <section>
      <h1>Create new venue</h1>
      <CreateFormWrapper />
    </section>
  );
}
