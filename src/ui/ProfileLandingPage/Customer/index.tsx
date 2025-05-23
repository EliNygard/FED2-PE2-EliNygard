"use client";

import {
  LuBriefcase,
  LuCalendarFold,
  LuHouse,
  LuUserRoundPen,
} from "react-icons/lu";

export default function Customer({ username }: { username: string }) {
  return (
    <section className="flex flex-col gap-9 mb-6">
      <header className="flex flex-col gap-3">
        <h1>Welcome back to Holidaze, {username}!</h1>
        <h2 className="flex gap-2 items-center">
          <LuBriefcase />
          <span>You are a traveler</span>
        </h2>
      </header>

      <p>
        Find and book your perfect stay—whether it&apos;s for business, a
        weekend getaway, or a family trip.
      </p>

      <div>
        <p className="mb-4">What you can do as a traveler</p>
        <ul className="flex flex-col gap-2 md:gap-4">
          <li className="flex gap-2 items-center">
            <span className="w-5 self-start">
              <LuHouse size={20} />
            </span>

            <span>Explore available stays at your favorite location.</span>
          </li>

          <li className="flex gap-2 items-center">
            <span className="w-5 self-start">
              <LuCalendarFold size={20} />
            </span>
            <span>View your upcoming and past reservations.</span>
          </li>
          <li className="flex gap-2 items-center">
            <span className="w-5 self-start">
              <LuUserRoundPen size={20} />
            </span>
            <span>Update your profile photo.</span>
          </li>
        </ul>
      </div>

      <div className="border border-disabled-blue bg-[#dae8f1] max-w-md">
        <p className="p-6">
          Tip from the Holidaze team: Use our search filters to find venues by city, ambiance or surroundings—try queries like “Oslo“, “cabin forest“ or “sea view” to discover your perfect getaway.
        </p>
      </div>
    </section>
  );
}
