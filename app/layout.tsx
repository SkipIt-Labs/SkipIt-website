import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SkipIt - Simple tools for real problems",
  description: "The place you go when you know you don't have time to search",
  icons: {
    icon: "/skipit-icon.png",
    apple: "/skipit-icon.png",
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
        <link rel="icon" href="/skipit-icon.png" />
      </head>
      <body className="min-h-screen text-white relative">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
