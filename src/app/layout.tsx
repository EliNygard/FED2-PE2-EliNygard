import { roboto } from "@/ui/fonts";
import Footer from "@/ui/Footer";
import Header from "@/ui/header/Header";
import type { Metadata } from "next";
import "tw-animate-css";
import "./globals.css";


export const metadata: Metadata = {
  title: "Holidaze",
  description: "Escape the Ordinary, Embrace the Extraordinary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased min-h-screen grid grid-rows-[auto_1fr_auto] `}
      >
        <div className="px-6 lg:px-10 2xl:px-20">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
