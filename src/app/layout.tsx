import { roboto } from "@/ui/fonts";
import Footer from "@/ui/Footer";
import Header from "@/ui/header/Header";
import { ToastProvider } from "@/ui/ToastProvider";
import type { Metadata } from "next";
import { Toaster } from "sonner";
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
        className={`${roboto.className} antialiased min-h-screen flex flex-col`}
      >
        <Toaster position="top-right" />
        <Header />
        <main className="flex-1">{children}</main>
        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}
