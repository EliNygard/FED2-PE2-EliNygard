"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { AuthGuard } from "@/utils/AuthGuard";
import Image from "next/image";
import Link from "next/link";
import DesktopNav from "../DesktopNav";
import MobileNav from "../MobileNav";
import SearchBar from "../SearchBar";

export default function Header() {
  const isLoggedIn = AuthGuard();
  const userPicture = useAuthStore((state) => state.user?.avatar.url);
  const userName = useAuthStore((state) => state.user?.name);

  return (
    <header className="my-5 page-padding">
      <nav className="h-15 md:h-20">
        <ul className="flex gap-3 justify-between items-center">
          <li className="w-28 sm:w-34">
            <Link href="/">
              <Image
                src="/LogoHolidaze.png"
                alt="Holidaze logo"
                width={144}
                height={30}
              />
            </Link>
          </li>

          {isLoggedIn ? (
            <li>
              <Link href={`/profile/${userName}`} title="Your profile page">
                <div className="relative rounded-full h-10 w-10 overflow-hidden">
                  <Image
                    src={userPicture || "/default-user.png"}
                    alt={userName || "User"}
                    fill
                    sizes="33vw"
                    className="w-full object-cover rounded-full"
                  />
                </div>
              </Link>
            </li>
          ) : (
            <>
              <li className="block sm:hidden">
                <MobileNav />
              </li>
              <li className="hidden sm:flex">
                <DesktopNav />
              </li>
            </>
          )}
        </ul>
      </nav>
      <SearchBar />
    </header>
  );
}
