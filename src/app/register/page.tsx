'use client'

import { RegisterForm } from "@/ui/forms/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <main className="max-w-4xl m-auto">
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 md:gap-1.5 md:items-start">
        <div className="block md:hidden">
          <Image
            src="/LogoMountainsV.svg"
            alt="Welcome to Holidaze"
            width={640}
            height={320}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="hidden md:flex md:order-2">
          <Image
            src="/LogoMountainsH.svg"
            alt="Welcome to Holidaze"
            width={463}
            height={617}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="mt-6 md:mt-0 md:order-1">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
