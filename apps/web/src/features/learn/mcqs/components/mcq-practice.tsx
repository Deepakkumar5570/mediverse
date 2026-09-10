"use client";

import { useEffect, useState } from "react";

import {
  submitMcqAnswerAction,
} from "../actions";

import {
  AchievementUnlockModal,
  type UnlockedAchievement,
} from "@/src/features/gamification/achievements/components/achievement-unlock-modal";

import {
  completePracticeSessionAction,
  createPracticeSessionAction,
  recordMcqAttemptAction,
} from "@/src/features/learn/practice/practice-analytics.actions";

type MCQ = {
  id: string;
  subtopicId: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  difficulty: string;
  questionNumber: number;
};

type Props = {
  mcqs: MCQ[];
  practiceMode?: "quick" | "topic" | "random";
};

type Result = {
  correct: boolean;
  explanation: string | null;
};

const options = [
  { key: 1, label: "A" },
  { key: 2, label: "B" },
  { key: 3, label: "C" },
  { key: 4, label: "D" },
] as const;

export function MCQPractice({
  mcqs,
  practiceMode = "topic",
}: Props) {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [selectedOption, setSelectedOption] =
    useState<number | null>(null);

  const [result, setResult] =
    useState<Result | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [score, setScore] = useState(0);

  const [sessionId, setSessionId] =
    useState<string | null>(null);

  const [sessionCreating, setSessionCreating] =
    useState(true);

  const [
    questionStartedAt,
    setQuestionStartedAt,
  ] = useState(() => Date.now());

  const [practiceRun, setPracticeRun] =
    useState(0);

  const [
    unlockedAchievements,
    setUnlockedAchievements,
  ] = useState<
    UnlockedAchievement[]
  >([]);

  useEffect(() => {
    let cancelled = false;

    async function createSession() {
      try {
        const session =
          await createPracticeSessionAction(
            practiceMode,
          );

        if (!cancelled) {
          setSessionId(session.id);
        }
      } catch {
        // Guest users can still practice.
      } finally {
        if (!cancelled) {
          setSessionCreating(false);
        }
      }
    }

    void createSession();

    return () => {
      cancelled = true;
    };
  }, [practiceMode, practiceRun]);

  if (mcqs.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <h3 className="text-lg font-bold text-slate-900">
          No questions available yet
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          MCQ practice for this subtopic will be
          available soon.
        </p>
      </div>
    );
  }

  const current = mcqs[currentIndex];

  const optionValues = [
    current.optionA,
    current.optionB,
    current.optionC,
    current.optionD,
  ];

  const isLastQuestion =
    currentIndex === mcqs.length - 1;

  function addUnlockedAchievements(
    achievements: UnlockedAchievement[],
  ) {
    if (achievements.length === 0) {
      return;
    }

    setUnlockedAchievements(
      (previous) => {
        const existingKeys = new Set(
          previous.map(
            (achievement) =>
              achievement.achievementKey,
          ),
        );

        const newAchievements =
          achievements.filter(
            (achievement) =>
              !existingKeys.has(
                achievement.achievementKey,
              ),
          );

        return [
          ...previous,
          ...newAchievements,
        ];
      },
    );
  }

  async function handleSubmit() {
    if (
      selectedOption === null ||
      submitting ||
      result ||
      sessionCreating
    ) {
      return;
    }

    setSubmitting(true);

    try {
      const response =
        await submitMcqAnswerAction(
          current.id,
          selectedOption,
        );

      if (!response) {
        return;
      }

      setResult(response);

      const newScore =
        score +
        (response.correct ? 1 : 0);

      if (response.correct) {
        setScore(
          (previous) => previous + 1,
        );
      }

      if (sessionId) {
        const timeTaken = Math.max(
          0,
          Math.round(
            (Date.now() -
              questionStartedAt) /
              1000,
          ),
        );

        try {
          const attemptResult =
            await recordMcqAttemptAction({
              sessionId,
              mcqId: current.id,
              selectedOption,
              correct:
                response.correct,
              timeTaken,
            });

          addUnlockedAchievements(
            attemptResult
              .unlockedAchievements as UnlockedAchievement[],
          );
        } catch (error) {
          console.error(
            "Failed to record MCQ attempt:",
            error,
          );
        }

        if (isLastQuestion) {
          try {
            const sessionResult =
              await completePracticeSessionAction(
                {
                  sessionId,
                  totalQuestions:
                    mcqs.length,
                  correctAnswers:
                    newScore,
                  wrongAnswers:
                    mcqs.length -
                    newScore,
                },
              );

            addUnlockedAchievements(
              sessionResult
                .unlockedAchievements as UnlockedAchievement[],
            );
          } catch (error) {
            console.error(
              "Failed to complete practice session:",
              error,
            );
          }
        }
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleNext() {
    if (isLastQuestion) {
      return;
    }

    setCurrentIndex(
      (previous) => previous + 1,
    );

    setSelectedOption(null);
    setResult(null);
    setQuestionStartedAt(
      Date.now(),
    );
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setResult(null);
    setScore(0);

    setSessionId(null);
    setSessionCreating(true);

    setQuestionStartedAt(
      Date.now(),
    );

    setPracticeRun(
      (previous) => previous + 1,
    );
  }

  if (currentIndex >= mcqs.length) {
    return null;
  }

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-6 py-6 md:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                MCQ Practice
              </p>

              <h3 className="mt-1 text-xl font-black tracking-tight text-slate-950">
                Test your understanding
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200">
                Question{" "}
                {currentIndex + 1} /{" "}
                {mcqs.length}
              </span>

              <span className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold capitalize text-violet-700">
                {current.difficulty}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-300"
              style={{
                width: `${
                  ((currentIndex + 1) /
                    mcqs.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-6 md:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Question{" "}
              {current.questionNumber}
            </p>

            <h4 className="mt-3 text-xl font-bold leading-8 text-slate-950 md:text-2xl">
              {current.question}
            </h4>
          </div>

          {/* Options */}
          <div className="mt-8 space-y-3">
            {options.map((option) => {
              const value =
                optionValues[
                  option.key - 1
                ];

              const selected =
                selectedOption ===
                option.key;

              let optionClass =
                "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50/50";

              if (
                selected &&
                !result
              ) {
                optionClass =
                  "border-violet-500 bg-violet-50 ring-2 ring-violet-100";
              }

              if (result) {
                if (
                  selected &&
                  result.correct
                ) {
                  optionClass =
                    "border-emerald-400 bg-emerald-50";
                } else if (
                  selected &&
                  !result.correct
                ) {
                  optionClass =
                    "border-red-400 bg-red-50";
                }
              }

              return (
                <button
                  key={option.key}
                  type="button"
                  disabled={!!result}
                  onClick={() =>
                    setSelectedOption(
                      option.key,
                    )
                  }
                  className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all ${optionClass}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-black text-slate-700">
                    {option.label}
                  </span>

                  <span className="pt-1 text-sm font-medium leading-6 text-slate-700">
                    {value}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result */}
          {result && (
            <div
              className={`mt-6 rounded-2xl border p-5 ${
                result.correct
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${
                    result.correct
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {result.correct
                    ? "✓"
                    : "×"}
                </span>

                <div>
                  <p
                    className={`font-bold ${
                      result.correct
                        ? "text-emerald-800"
                        : "text-red-800"
                    }`}
                  >
                    {result.correct
                      ? "Correct answer!"
                      : "Not quite right."}
                  </p>

                  <p className="text-sm text-slate-600">
                    {result.correct
                      ? "Great job. Keep going."
                      : "Review the explanation and try to remember the concept."}
                  </p>
                </div>
              </div>

              {result.explanation && (
                <div className="mt-4 border-t border-current/10 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Explanation
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {result.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-medium text-slate-500">
              Score:{" "}
              <span className="font-bold text-slate-900">
                {score}
              </span>{" "}
              /{" "}
              {currentIndex +
                (result ? 1 : 0)}
            </div>

            {!result ? (
              <button
                type="button"
                disabled={
                  selectedOption ===
                    null ||
                  submitting ||
                  sessionCreating
                }
                onClick={handleSubmit}
                className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {sessionCreating
                  ? "Starting..."
                  : submitting
                    ? "Checking..."
                    : "Check Answer"}
              </button>
            ) : isLastQuestion ? (
              <button
                type="button"
                onClick={handleRestart}
                className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Try Again
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Next Question →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Achievement Unlock Modal */}
      {unlockedAchievements.length >
        0 && (
        <AchievementUnlockModal
          achievements={
            unlockedAchievements
          }
          onClose={() =>
            setUnlockedAchievements(
              [],
            )
          }
        />
      )}
    </>
  );
}