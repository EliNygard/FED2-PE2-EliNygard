"use client";

import {
  LuBadgeCheck,
  LuCalendarFold,
  LuHouse,
  LuHousePlus,
  LuPencil,
  LuUserRoundPen,
} from "react-icons/lu";

export default function VenueManager({ username }: { username: string }) {
  return (
    <div className="flex flex-col gap-9 mb-6">
      <header className="flex flex-col gap-3">
        <h1>Welcome back to Holidaze, {username}!</h1>
        <h2 className="flex gap-2 items-center">
          <LuBadgeCheck aria-hidden='true' />
          <span>You are a venue manager</span>
        </h2>
      </header>

      <p>
        Manage your venues, bookings and guests, all from one place. Ready to
        host your next visitor?
      </p>

      <div>
        <p className="mb-4">What you can do as a venue manager</p>
        <ul className="flex flex-col gap-2 md:gap-4">
          <li className="flex gap-2 items-center">
            <span className="w-5 self-start">
              <LuHousePlus size={20} aria-hidden='true' />
            </span>

            <span>List a new property and start earning.</span>
          </li>
          <li className="flex gap-2 items-center">
            <span className="w-5 self-start">
              <LuPencil size={20} aria-hidden='true' />
            </span>
            <span>View and edit the venues you currently host.</span>
          </li>
          <li className="flex gap-2 items-center">
            <span className="w-5 self-start">
              <LuCalendarFold size={20} aria-hidden='true' />
            </span>
            <span>See upcoming and past reservations for all your venues.</span>
          </li>
          <li className="flex gap-2 items-center">
            <span className="w-5 self-start">
              <LuUserRoundPen size={20} aria-hidden='true' />
            </span>
            <span>Update your profile photo.</span>
          </li>
          <li className="flex gap-2 items-center">
            <span className="w-5 self-start">
              <LuHouse size={20} aria-hidden='true' />
            </span>
            <span>Take a break and book your own holiday.</span>
          </li>
        </ul>
      </div>

      <div className="border border-disabled-blue bg-[#dae8f1] max-w-md">
        <p className="p-6">
          Tip from the Holidaze team: Encourage quality listings by adding
          several high-quality photos and detailed descriptions of your venue.
        </p>
      </div>
    </div>
  );
}
