import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz",
  description: "Answer 40 questions across 10 dimensions and discover your unique political shape.",
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
