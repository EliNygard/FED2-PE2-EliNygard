"use client";

import { Suspense } from "react";
import SearchClient from "../../ui/SearchClient";

export default function SearchPage() {
  return (
    <div>
      <Suspense>
        <SearchClient />
      </Suspense>
    </div>
  );
}
