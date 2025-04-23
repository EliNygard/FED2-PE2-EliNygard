"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
                    className="object-cover rounded-full"
                  />
                </Link>
              </div>
            ) : (
              <>
                <div className="block sm:hidden">
                  <Dialog>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <FaBars className="size-7 text-brand-blue" />
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
                    {/* <Button>Log in</Button> */}
                    <DialogContent className="bg-secondary-background">
                      <DialogHeader>
                        <div >
                          <p>Welcome to Holidaze</p>
                        </div>
                        <DialogTitle className="text-xl">
                          Log into your account
                        </DialogTitle>
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
                      <DialogContent className="bg-secondary-background">
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <LoginForm></LoginForm>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
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
