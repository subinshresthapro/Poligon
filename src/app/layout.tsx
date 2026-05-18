import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Political Shape",
  description:
    "Discover your multidimensional political shape — beyond left and right.",
  openGraph: {
    title: "Your Political Shape",
    description: "A civic-tech quiz that maps your political views as a unique radar shape.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
