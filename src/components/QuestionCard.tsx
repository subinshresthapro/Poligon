"use client";

import { ScoreValue } from "@/types";

interface QuestionCardProps {
  questionId: string;
  text: string;
  index: number;
  value?: ScoreValue;
  onChange: (questionId: string, value: ScoreValue) => void;
}

const OPTIONS: {
  value: ScoreValue;
  label: string;
  shortLabel: string;
  color: string;
  bg: string;
  selectedBg: string;
}[] = [
  {
    value: -2,
    label: "Strongly Disagree",
    shortLabel: "Strongly\nDisagree",
    color: "text-red-700",
    bg: "border-red-200 hover:border-red-400 hover:bg-red-50",
    selectedBg: "border-red-500 bg-red-500 text-white shadow-md",
  },
  {
    value: -1,
    label: "Somewhat Disagree",
    shortLabel: "Somewhat\nDisagree",
    color: "text-orange-600",
    bg: "border-orange-200 hover:border-orange-400 hover:bg-orange-50",
    selectedBg: "border-orange-500 bg-orange-500 text-white shadow-md",
  },
  {
    value: 0,
    label: "Neutral / Mixed",
    shortLabel: "Neutral /\nMixed",
    color: "text-[rgba(10,10,10,0.55)]",
    bg: "border-[rgba(10,10,10,0.12)] hover:border-slate-400 hover:bg-[#E5E0D2]",
    selectedBg: "border-slate-500 bg-slate-500 text-white shadow-md",
  },
  {
    value: 1,
    label: "Somewhat Agree",
    shortLabel: "Somewhat\nAgree",
    color: "text-emerald-600",
    bg: "border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50",
    selectedBg: "border-emerald-500 bg-emerald-500 text-white shadow-md",
  },
  {
    value: 2,
    label: "Strongly Agree",
    shortLabel: "Strongly\nAgree",
    color: "text-emerald-700",
    bg: "border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50",
    selectedBg: "border-emerald-600 bg-emerald-600 text-white shadow-md",
  },
];

export default function QuestionCard({
  questionId,
  text,
  index,
  value,
  onChange,
}: QuestionCardProps) {
  return (
    <div className="bg-[#F1EEE5] rounded-2xl border border-[rgba(10,10,10,0.12)] p-6 shadow-sm">
      <p className="text-sm text-[rgba(10,10,10,0.45)] font-medium mb-2">Q{index + 1}</p>
      <p className="text-base font-medium text-[#0A0A0A] mb-6 leading-relaxed">
        &ldquo;{text}&rdquo;
      </p>

      {/* Desktop: horizontal row */}
      <div className="hidden sm:grid grid-cols-5 gap-2">
        {OPTIONS.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(questionId, opt.value)}
              className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 text-xs font-medium transition-all leading-tight text-center ${
                isSelected
                  ? opt.selectedBg
                  : `${opt.bg} ${opt.color} bg-[#F1EEE5]`
              }`}
            >
              <span className="whitespace-pre-line">{opt.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile: vertical stack */}
      <div className="sm:hidden grid grid-cols-1 gap-2">
        {OPTIONS.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(questionId, opt.value)}
              className={`flex items-center justify-center py-2.5 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                isSelected
                  ? opt.selectedBg
                  : `${opt.bg} ${opt.color} bg-[#F1EEE5]`
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
