"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { AuthGuard } from "@/utils/AuthGuard";
import Image from "next/image";
import Link from "next/link";
import DesktopNav from "../headerComponents/DesktopNav";
import MobileNav from "../headerComponents/MobileNav";

export default function HeaderNew() {
  const isLoggedIn = AuthGuard();
  const userPicture = useAuthStore((state) => state.user?.avatar.url);
  const userName = useAuthStore((state) => state.user?.name);

  return (
    <header className="h-20 py-5">
      <nav>
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/" className="flex items-center">
              <Image
                src="/LogoHolidazeShort.svg"
                alt="Holidaze Logo (mobile)"
                width={22}
                height={28}
                className="block sm:hidden"
              />

              <Image
                src="/LogoHolidaze.svg"
                alt="Holidaze logo (desktop)"
                width={144}
                height={40}
                className="hidden sm:flex"
                style={{height:'auto'}}
              />
            </Link>
          </li>

          {isLoggedIn ? (
            <li>
              <Link href="/profile">
                <div className="relative rounded-full h-10 w-10 overflow-hidden">
                  <Image
                    src={userPicture || "/default-user.svg"}
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
    </header>
  );
}
