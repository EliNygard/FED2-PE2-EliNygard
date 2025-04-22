import type { Metadata } from "next";
import { roboto } from '@/ui/fonts'
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
        className={`${roboto.className} antialiased px-6 lg:px-10 2xl:px-20`}
      >
        {children}
      </body>
    </html>
  );
}
