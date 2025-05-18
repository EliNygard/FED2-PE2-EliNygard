import { roboto } from "@/ui/fonts";
import Footer from "@/ui/Footer";
import Header from "@/ui/header/Header";
import { ToastProvider } from "@/ui/ToastProvider";
import type { Metadata } from "next";
import "tw-animate-css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Escape the Ordinary, Embrace the Extraordinary - Holidaze",
  description: "A website for booking venues.",
};

/**
 * Root Layout component for all pages.
 *
 * - Renders React components for toaster, header and footer, and children
 * - Includes a toast provider to make sure the toasters are displayed if the user is directed to a new page
 */

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
        <Header />
        {/* <Suspense fallback={<Loading />}> */}
          <main className="flex-1">{children}</main>
        {/* </Suspense> */}

        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}
