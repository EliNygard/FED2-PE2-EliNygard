"use client";

import CreateFormWrapper from "@/ui/CreateFormWrapper";

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
