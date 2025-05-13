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

export default function LoginPage() {
  return (
    <section className="max-w-4xl m-auto page-padding flex flex-col gap-5">
      <h1>
        Log in to your Holidaze profile
      </h1>
      <p>Find and book your next stay at one of our venues.</p>

    <ul className="flex gap-5 items-center m-auto ">
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
        <li>
          <p>OR</p>
        </li>
        <li>
            <Link href="/register">Register</Link>
        </li>
      </ul>
    </section>
  )
}