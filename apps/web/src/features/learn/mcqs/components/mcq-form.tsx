"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createMcqAction,
  updateMcqAction,
} from "../actions";

type Subtopic = {
  id: string;
  title: string;
  subtopicNumber: number;
};

type MCQ = {
  id: string;
  subtopicId: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: number;
  explanation: string | null;
  difficulty: string;
  questionNumber: number;
  status: string;
};

type Props = {
  subtopics: Subtopic[];
  initialData?: MCQ;
};

export function MCQForm({
  subtopics,
  initialData,
}: Props) {
  const router = useRouter();

  const [subtopicId, setSubtopicId] =
    useState(initialData?.subtopicId ?? "");

  const [question, setQuestion] =
    useState(initialData?.question ?? "");

  const [optionA, setOptionA] =
    useState(initialData?.optionA ?? "");

  const [optionB, setOptionB] =
    useState(initialData?.optionB ?? "");

  const [optionC, setOptionC] =
    useState(initialData?.optionC ?? "");

  const [optionD, setOptionD] =
    useState(initialData?.optionD ?? "");

  const [correctOption, setCorrectOption] =
    useState(
      initialData?.correctOption ?? 1,
    );

  const [explanation, setExplanation] =
    useState(initialData?.explanation ?? "");

  const [difficulty, setDifficulty] =
    useState(
      initialData?.difficulty ?? "medium",
    );

  const [questionNumber, setQuestionNumber] =
    useState(
      initialData?.questionNumber ?? 1,
    );

  const [status, setStatus] =
    useState(
      initialData?.status ?? "draft",
    );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!subtopicId) {
      setError("Please select a subtopic.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const data = {
        subtopicId,
        question: question.trim(),
        optionA: optionA.trim(),
        optionB: optionB.trim(),
        optionC: optionC.trim(),
        optionD: optionD.trim(),
        correctOption,
        explanation:
          explanation.trim() || undefined,
        difficulty: difficulty as
          | "easy"
          | "medium"
          | "hard",
        questionNumber,
        status: status as
          | "draft"
          | "active"
          | "inactive",
      };

      if (initialData) {
        await updateMcqAction(
          initialData.id,
          data,
        );
      } else {
        await createMcqAction(data);
      }

      router.push("/admin/mcqs");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Academic placement */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
            Academic placement
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-900">
            Where does this question belong?
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select the subtopic where students
            should see this MCQ.
          </p>
        </div>

        <div className="mt-6">
          <label className="text-sm font-semibold text-slate-700">
            Subtopic
          </label>

          <select
            value={subtopicId}
            onChange={(event) =>
              setSubtopicId(event.target.value)
            }
            className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-50"
            required
          >
            <option value="">
              Select a subtopic
            </option>

            {subtopics.map((subtopic) => (
              <option
                key={subtopic.id}
                value={subtopic.id}
              >
                {String(
                  subtopic.subtopicNumber,
                ).padStart(2, "0")}{" "}
                — {subtopic.title}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Question */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            Question
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-900">
            Write the question
          </h2>
        </div>

        <textarea
          value={question}
          onChange={(event) =>
            setQuestion(event.target.value)
          }
          placeholder="Enter the MCQ question..."
          rows={5}
          required
          className="mt-6 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
        />
      </section>

      {/* Options */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
            Answer options
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-900">
            Add four choices
          </h2>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            {
              label: "A",
              value: optionA,
              setter: setOptionA,
            },
            {
              label: "B",
              value: optionB,
              setter: setOptionB,
            },
            {
              label: "C",
              value: optionC,
              setter: setOptionC,
            },
            {
              label: "D",
              value: optionD,
              setter: setOptionD,
            },
          ].map((option) => (
            <div key={option.label}>
              <label className="text-sm font-semibold text-slate-700">
                Option {option.label}
              </label>

              <textarea
                value={option.value}
                onChange={(event) =>
                  option.setter(
                    event.target.value,
                  )
                }
                rows={3}
                required
                placeholder={`Enter option ${option.label}...`}
                className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label className="text-sm font-semibold text-slate-700">
            Correct answer
          </label>

          <div className="mt-3 grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((value) => {
              const label = String.fromCharCode(
                64 + value,
              );

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setCorrectOption(value)
                  }
                  className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                    correctOption === value
                      ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-emerald-50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
          Explanation
        </p>

        <h2 className="mt-2 text-xl font-bold text-slate-900">
          Help students understand the answer
        </h2>

        <textarea
          value={explanation}
          onChange={(event) =>
            setExplanation(event.target.value)
          }
          rows={5}
          placeholder="Explain why the correct answer is correct..."
          className="mt-6 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-50"
        />
      </section>

      {/* Metadata */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          Question settings
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Question number
            </label>

            <input
              type="number"
              min={1}
              value={questionNumber}
              onChange={(event) =>
                setQuestionNumber(
                  Number(event.target.value),
                )
              }
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(event) =>
                setDifficulty(event.target.value)
              }
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            >
              <option value="easy">
                Easy
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="hard">
                Hard
              </option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            >
              <option value="draft">
                Draft
              </option>

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="sticky bottom-4 z-10 flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() =>
            router.push("/admin/mcqs")
          }
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : initialData
              ? "Update MCQ"
              : "Create MCQ"}
        </button>
      </div>
    </form>
  );
}