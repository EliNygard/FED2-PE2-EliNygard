"use client";

import { Suspense } from "react";
import SearchClient from "./SearchClient";



export default function SearchPage() {
  

  return (
    <main>
      <Suspense>
    <SearchClient />
      </Suspense>
    </main>
  );
}
