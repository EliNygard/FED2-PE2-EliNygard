"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/useAuthStore";
import { AuthGuard } from "@/utils/AuthGuard";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import Button from "../Button";

export default function Header() {
  const isLoggedIn = AuthGuard();
  const userPicture = useAuthStore((state) => state.user?.avatar.url);
  const userName = useAuthStore.getState().user?.name;

  return (
    <header className="flex justify-between items-center h-20 py-5">
      <div>
        <Link href="/" className="flex items-center">
          <Image
            src="./LogoHolidazeShort.svg"
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
            className="hidden sm:block"
          />
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <div className="relative rounded-full h-10 w-10 overflow-hidden">
            <Link href="/profile">
              <Image
                src={userPicture || "/default-user.svg"}
                alt={userName || "User"}
                fill
                className="object-cover rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            <div className="block sm:hidden">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <FaBars className="size-7 text-brand-blue" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="px-11 py-4 flex flex-col gap-4 text-brand-blue">
                  <DropdownMenuItem>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Log in</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="hidden sm:flex gap-5 items-center">
              <Link href="/register">
                <button className="text-brand-blue cursor-pointer">
                  Register
                </button>
              </Link>
              <Button>Log In</Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
