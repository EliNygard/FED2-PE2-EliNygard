"use client";

import { RegisterForm } from "@/ui/forms/RegisterForm";
import Image from "next/image";

/**
 * Page component for displaying the register form.
 *
 * - Renders <RegisterForm> and a brand image based on screen size (mobile or md)
 */

export default function RegisterPage() {
  return (
    <section className="max-w-4xl m-auto page-padding">
      <div className="mt-3 grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-1.5 md:items-start">
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
    </section>
  );
}
