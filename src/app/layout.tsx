import type { Metadata } from "next";
import { Providers } from "@/context/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "BambooParts - Premium Bamboo Flute Parts & Materials",
  description:
    "Craft your own bamboo flute with our premium parts, tubes, mouthpieces, and accessories. Sustainably sourced materials for handmade flutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
