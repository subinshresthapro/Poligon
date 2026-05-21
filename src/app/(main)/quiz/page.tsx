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

  // Restore saved answers on first mount
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const saved = loadAnswers();
    if (saved && Object.keys(saved).length > 0) {
      setAnswers(saved);
      setRestored(true);
      // Jump to first incomplete category
      const firstIncomplete = CATEGORIES.findIndex(
        (cat) => !cat.questions.every((q) => saved[q.id] !== undefined)
      );
      if (firstIncomplete !== -1) setCategoryIndex(firstIncomplete);
    }
  }, []);

  const currentCategory = CATEGORIES[categoryIndex];
  const totalCategories = CATEGORIES.length;
  const isLast = categoryIndex === totalCategories - 1;

  const handleAnswer = useCallback((questionId: string, value: ScoreValue) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      saveAnswers(next); // auto-save every change
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

  const handleNext = () => {
    if (isLast) {
      const scores = answersToScores(answers);
      saveScores(scores);
      const encoded = encodeScores(scores);
      router.push(`/results?scores=${encoded}`);
    } else {
      setCategoryIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (categoryIndex > 0) {
      setCategoryIndex((i) => i - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* Restored banner */}
        {restored && (
          <div className="mb-4 flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 text-sm">
            <span className="text-indigo-700">
              ✓ Your previous answers have been restored.
            </span>
            <button
              onClick={handleStartFresh}
              className="text-indigo-500 hover:text-indigo-700 font-medium underline underline-offset-2 text-xs ml-4 flex-shrink-0"
            >
              Start fresh
            </button>
          </div>
        )}

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
            <span>Category {categoryIndex + 1} of {totalCategories}</span>
            <div className="flex items-center gap-3">
              <span>{progressPct}% complete</span>
              {!restored && totalAnswered === 0 && (
                <span className="text-xs text-slate-400">Answers auto-save as you go</span>
              )}
            </div>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Category dots */}
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {CATEGORIES.map((cat, i) => {
              const catAnswered = cat.questions.every((q) => answers[q.id] !== undefined);
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategoryIndex(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  title={cat.name}
                  className={`w-7 h-7 rounded-full text-xs flex items-center justify-center transition-all font-medium ${
                    i === categoryIndex
                      ? "bg-indigo-600 text-white scale-110 shadow-md ring-2 ring-indigo-300"
                      : catAnswered
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-500 hover:bg-slate-300"
                  }`}
                >
                  {catAnswered && i !== categoryIndex ? "✓" : i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category header */}
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentCategory.emoji}</span>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{currentCategory.name}</h1>
                <p className="text-sm text-slate-500 mt-0.5">{currentCategory.description}</p>
              </div>
            </div>
            {!restored && (
              <span className="text-xs text-slate-400 text-right hidden sm:block">
                Answers saved<br />automatically
              </span>
            )}
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
            {currentAnsweredCount}/{currentCategory.questions.length} answered this section
          </div>

          {/* If all answered (even from a saved session), allow jump to results */}
          {allAnswered && !isLast ? (
            <button
              onClick={() => {
                const scores = answersToScores(answers);
                saveScores(scores);
                router.push(`/results?scores=${encodeScores(scores)}`);
              }}
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
