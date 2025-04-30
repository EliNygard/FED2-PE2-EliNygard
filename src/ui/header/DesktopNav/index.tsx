import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/ui/Button";
import LoginForm from "@/ui/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function DesktopNav() {
  return (
      <ul className="flex gap-5 items-center">
        <li>
            <Link href="/register">Register</Link>
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
                    Log in to your account
                  </DialogTitle>
                  <DialogDescription className="hidden"></DialogDescription>
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
                </DialogHeader>
              </div>
            </DialogContent>
          </Dialog>
        </li>
      </ul>
  );
}
