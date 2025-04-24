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
import LoginForm from "@/ui/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";

export default function MobileNav() {
  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <FaBars
            className="size-7 text-brand-blue"
            aria-label="Open menu"
            tabIndex={0}
          />
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
          <DialogTitle className="text-xl">Log into your account</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
