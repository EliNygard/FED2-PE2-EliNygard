import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Button from "../Button";
import LoginForm from "../forms/LoginForm";

export default function LoginButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log in</Button>
      </DialogTrigger>
      <DialogContent className="bg-secondary-background max-h-[calc(100vh-4rem)] overflow-y-auto touch-pan-y md:max-w-2xl max-w-[calc(100%-1rem)]">
        <div className="grid md:grid-cols-2">
          <div className="md:py-4 md:pr-8 mt-11">
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
              className="w-full h-auto object-contain hidden md:block"
              priority
            />
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}
