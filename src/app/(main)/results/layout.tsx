import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Results",
  description: "Your unique political polygon: 10 dimensions, one shape.",
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
