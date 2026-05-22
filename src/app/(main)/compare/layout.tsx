import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare",
  description: "See how your political shape compares with a friend, side by side.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
