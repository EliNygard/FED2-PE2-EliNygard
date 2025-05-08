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
    <div>
      <Suspense>
        <SearchClient />
      </Suspense>
    </div>
  );
}
