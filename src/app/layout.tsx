import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Bazar Dor",
  description: "Bangladesh Essential Products Price Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}