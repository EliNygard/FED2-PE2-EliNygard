"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { LoginForm } from "../forms/LoginForm";

export default function Header() {
  const isLoggedIn = AuthGuard();
  const userPicture = useAuthStore((state) => state.user?.avatar.url);
  const userName = useAuthStore.getState().user?.name;

  return (
    <header className="h-20 py-5">
      <nav>
        <ul className="flex justify-between items-center">
          <li>
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
              <>
                <div className="block sm:hidden">
                  <Dialog>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <FaBars className="size-7 text-brand-blue" aria-label="Open menu" tabIndex={1} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="px-11 py-4 flex flex-col gap-4 text-brand-blue">
                        <DropdownMenuItem>
                          <Link href="/register">Register</Link>
                        </DropdownMenuItem>
                        <DialogTrigger asChild>
                          <DropdownMenuItem>Log in</DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="bg-secondary-background sm:max-w-md max-h-[calc(100vh-4rem)] overflow-y-auto touch-pan-y">
                      <DialogHeader>
                        <Image
                          src="/LogoMountainsV.svg"
                          alt="Welcome to Holidaze"
                          width={321}
                          height={214}
                          className="w-full h-auto object-contain"
                          priority
                        />
                        <DialogTitle className="text-xl">
                          Log into your account
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <LoginForm />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <ul className="hidden sm:flex gap-5 items-center">
                  <li>
                    <Link href="/register">
                      <button className="text-brand-blue cursor-pointer">
                        Register
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Log in</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-secondary-background max-h-[calc(100vh-4rem)] overflow-y-auto touch-pan-y">
                        <div className="grid grid-cols-2">
                          <div className="py-4 pr-8 mt-11">
                            <DialogTitle className="text-xl mb-10">
                              Log into your account
                            </DialogTitle>
                            <LoginForm />
                          </div>
                          <DialogHeader>
                            <Image
                              src="/LogoMountainsH.svg"
                              alt="Welcome to Holidaze"
                              width={321}
                              height={214}
                              className="w-full h-auto object-contain"
                              priority
                            />
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </li>
                </ul>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
