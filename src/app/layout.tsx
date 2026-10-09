import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";

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
        <Toaster position="top-right" />
      </body>
    </html>
  );
}