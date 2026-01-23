import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { basePath } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "SkipIt - Simple tools for real problems",
  description: "The place you go when you know you don't have time to search",
  icons: {
    icon: `${basePath}/skipit-icon.png`,
    apple: `${basePath}/skipit-icon.png`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`${basePath}/skipit-icon.png`} />
      </head>
      <body className="min-h-screen text-white relative">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
