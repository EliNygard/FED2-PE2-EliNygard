"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { AuthGuard } from "@/utils/AuthGuard";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "../headerComponents/MobileNav";

export default function HeaderNew() {
  const isMobileView = useMediaQuery("(max-width: 639px)");
  const isLoggedIn = AuthGuard();
  const userPicture = useAuthStore((state) => state.user?.avatar.url);
  const userName = useAuthStore.getState().user?.name;

  return (
    <header className="h-20 py-5">
      <nav>
        <ul className="flex justify-between items-center">
          <li>
            <Link href="/" className="flex items-center">
              {isMobileView ? (
                <Image
                  src="/LogoHolidazeShort.svg"
                  alt="Holidaze Logo (mobile)"
                  width={22}
                  height={28}
                />
              ) : (
                <Image
                  src="/LogoHolidaze.svg"
                  alt="Holidaze logo (desktop)"
                  width={144}
                  height={40}
                />
              )}
            </Link>
          </li>

          <li>
            {isLoggedIn ? (
              <div className="relative rounded-full h-10 w-10 overflow-hidden">
                <Link href="/profile">
                  <Image
                    src={userPicture || "/default-user.svg"}
                    alt={userName || "User"}
                    fill
                    sizes="33vw"
                    className="w-full object-cover rounded-full"
                  />
                </Link>
              </div>
            ) : (
              <div>
                {isMobileView ? (
                  <MobileNav />
                ) : (
                  <nav>
                    <ul className="flex gap-5 items-center">
                      <li>
                        <button>
                          <Link href="/register">Register</Link>
                        </button>
                      </li>
                      <li>
                        <div>Log in</div>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
