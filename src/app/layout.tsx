import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Poligon — The Shape of Your Politics",
  description:
    "Discover your unique political polygon across 10 dimensions. Beyond left and right.",
  openGraph: {
    title: "Poligon — The Shape of Your Politics",
    description:
      "A non-partisan tool that maps your political views as a unique coloured polygon across 10 dimensions.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
