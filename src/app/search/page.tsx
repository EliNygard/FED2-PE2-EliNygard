"use client";

import { Suspense } from "react";
import SearchClient from "../../ui/SearchClient";

// add page padding

/**
 * Page component for displaying the search result.
 *
 * - Renders <SearchClient>
 */

export default function SearchPage() {
  return (
    <section className="flex flex-col gap-[32px] page-padding">
      <Suspense>
        <SearchClient />
      </Suspense>
    </section>
  );
}
