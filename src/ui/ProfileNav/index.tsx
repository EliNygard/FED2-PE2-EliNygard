"use client";

import { useLogout } from "@/hooks/useLogout";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Button from "../Button";

export default function ProfileNav() {
  const { username } = useParams();
  const path = usePathname();

  const isVenueManager = useAuthStore((state) => state.isVenueManager);
  const logout = useLogout();

  const Tab = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <li>
      <Link href={href} passHref>
        <div
          className={`text-center
        px-4 py-2 rounded text-white text-sm font-medium hover:bg-interaction-blue ${
            path === href ? "bg-interaction-blue" : "bg-brand-blue"
          }`}
        >
          {children}
        </div>
      </Link>
    </li>
  );

  return (
    <nav>
      <ul className="flex flex-wrap gap-3.5 md:flex-col md:gap-8 mb-4 md:mb-0">
        {isVenueManager && (
          <>
            <Tab href={`/profile/${username}/venues/new`}>Create New Venue</Tab>
            <Tab href={`/profile/${username}/venues`}>My Venues</Tab>
          </>
        )}

        <Tab href={`/profile/${username}/bookings`}>My Bookings</Tab>
        <Tab href={`/profile/${username}/edit`}>Edit Profile</Tab>
        <li>
          <Button
            $variant="narrow"
            className="bg-primary-font"
            onClick={logout}
          >
            Log out
          </Button>
        </li>
      </ul>
    </nav>
  );
}
