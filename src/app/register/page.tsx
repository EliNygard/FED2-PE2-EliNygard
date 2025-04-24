"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { RegisterForm } from "@/ui/forms/RegisterForm";
import Image from "next/image";

export default function Register() {
  const logout = useAuthStore((state) => state.logout);
  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2">
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

        <div className="hidden md:flex">
          <Image
            src="/LogoMountainsH.svg"
            alt="Welcome to Holidaze"
            width={463}
            height={617}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="mt-6">
          <RegisterForm />
        </div>
      </div>

      <button onClick={logout}>Log out</button>
    </main>
  );
}
