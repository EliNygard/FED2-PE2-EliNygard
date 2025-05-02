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
    <Link href={href} passHref>
      <Button
        variant="narrow"
        className={path === href ? "bg-blue-600 text-white" : ""}
      >
        {children}
      </Button>
    </Link>
  );

  return (
    <div className="flex flex-wrap gap-3.5 md:flex-col md:gap-8 mb-4 md:mb-0">
      {isVenueManager && (
        <>
          <Tab href={`/profile/${username}/venues/new`}>Create New Venue</Tab>
          <Tab href={`/profile/${username}/venues`}>My Venues</Tab>
        </>
      )}

      <div>
        <Button variant="narrow" onClick={logout}>
          Log out
        </Button>
      </div>
      <Tab href={`/profile/${username}/edit`}>Edit Profile</Tab>
      <Tab href={`/profile/${username}/bookings`}>My Bookings</Tab>
    </div>
  );
}
