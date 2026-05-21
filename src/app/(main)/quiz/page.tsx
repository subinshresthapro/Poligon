"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/questions";
import { Answers, ScoreValue } from "@/types";
import { answersToScores, encodeScores } from "@/lib/scoring";
import { saveAnswers, loadAnswers, saveScores, clearSaved } from "@/lib/storage";
import QuestionCard from "@/components/QuestionCard";

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [restored, setRestored] = useState(false);
  const didInit = useRef(false);

  // Ref to scroll active pill into view in the nav bar
  const activePillRef = useRef<HTMLButtonElement>(null);
  // Ref to the very top of the quiz page content
  const pageTopRef = useRef<HTMLDivElement>(null);

  // Restore saved answers on first mount
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const saved = loadAnswers();
    if (saved && Object.keys(saved).length > 0) {
      setAnswers(saved);
      setRestored(true);
      const firstIncomplete = CATEGORIES.findIndex(
        (cat) => !cat.questions.every((q) => saved[q.id] !== undefined)
      );
      if (firstIncomplete !== -1) setCategoryIndex(firstIncomplete);
    }
  }, []);

  // Scroll page to top whenever category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoryIndex]);

  // Scroll active pill into view in horizontal nav
  useEffect(() => {
    activePillRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [categoryIndex]);

  const currentCategory = CATEGORIES[categoryIndex];
  const totalCategories = CATEGORIES.length;
  const isLast = categoryIndex === totalCategories - 1;

  const handleAnswer = useCallback((questionId: string, value: ScoreValue) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      saveAnswers(next);
      return next;
    });
  }, []);

  const handleStartFresh = () => {
    clearSaved();
    setAnswers({});
    setCategoryIndex(0);
    setRestored(false);
  };

  const currentAnsweredCount = currentCategory.questions.filter(
    (q) => answers[q.id] !== undefined
  ).length;
  const allCurrentAnswered = currentAnsweredCount === currentCategory.questions.length;

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = CATEGORIES.reduce((sum, c) => sum + c.questions.length, 0);
  const progressPct = Math.round((totalAnswered / totalQuestions) * 100);
  const allAnswered = totalAnswered === totalQuestions;

  const goToResults = () => {
    const scores = answersToScores(answers);
    saveScores(scores);
    router.push(`/results?scores=${encodeScores(scores)}`);
  };

  const handleNext = () => {
    if (isLast) {
      goToResults();
    } else {
      setCategoryIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (categoryIndex > 0) setCategoryIndex((i) => i - 1);
  };

  return (
    <div ref={pageTopRef} className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* Restored banner */}
        {restored && (
          <div className="mb-4 flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 text-sm">
            <span className="text-indigo-700">✓ Your previous answers have been restored.</span>
            <button
              onClick={handleStartFresh}
              className="text-indigo-500 hover:text-indigo-700 font-medium underline underline-offset-2 text-xs ml-4 flex-shrink-0"
            >
              Start fresh
            </button>
          </div>
        )}

        {/* Overall progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-medium">
              {categoryIndex + 1} / {totalCategories} categories
            </span>
            <span>{progressPct}% complete</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* ── Category pill navigation ── */}
        <div className="mb-6 -mx-4 sm:mx-0">
          <div className="flex gap-2 overflow-x-auto px-4 sm:px-0 pb-2 scrollbar-none"
               style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat, i) => {
              const catDone = cat.questions.every((q) => answers[q.id] !== undefined);
              const isActive = i === categoryIndex;
              return (
                <button
                  key={cat.id}
                  ref={isActive ? activePillRef : undefined}
                  onClick={() => setCategoryIndex(i)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 border transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                      : catDone
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.shortName}</span>
                  {catDone && !isActive && (
                    <span className="text-emerald-500 font-bold">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category header card */}
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentCategory.emoji}</span>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-slate-900">{currentCategory.name}</h1>
              <p className="text-sm text-slate-500 mt-0.5 leading-snug">
                {currentCategory.description}
              </p>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {currentCategory.questions.map((question, i) => (
            <QuestionCard
              key={question.id}
              questionId={question.id}
              text={question.text}
              index={i}
              value={answers[question.id] as ScoreValue | undefined}
              onChange={handleAnswer}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={categoryIndex === 0}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Back
          </button>

          <div className="text-xs text-slate-400 text-center">
            {currentAnsweredCount} / {currentCategory.questions.length} answered
          </div>

          {allAnswered && !isLast ? (
            <button
              onClick={goToResults}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              See My Shape →
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!allCurrentAnswered}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isLast ? "See My Shape →" : "Next →"}
            </button>
          )}
        </div>

        {!allCurrentAnswered && (
          <p className="text-center text-xs text-slate-400 mt-4">
            Answer all {currentCategory.questions.length} questions in this section to continue.
          </p>
        )}
      </div>
    </div>
  );
}
