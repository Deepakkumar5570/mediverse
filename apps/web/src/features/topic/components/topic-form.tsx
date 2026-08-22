"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createTopicAction,
  updateTopicAction,
} from "../actions";

type Program = {
  id: string;
  name: string;
};

type Semester = {
  id: string;
  programId: string;
  name: string;
  number: number;
};

type Subject = {
  id: string;
  semesterId: string;
  name: string;
};

type Unit = {
  id: string;
  subjectId: string;
  title: string;
};

type TopicInitialData = {
  id: string;
  unitId: string;
  title: string;
  slug: string;
  topicNumber: number;
  description: string | null;
  status: "active" | "inactive";
};

type Props = {
  programs: Program[];
  semesters: Semester[];
  subjects: Subject[];
  units: Unit[];
  initialData?: TopicInitialData;
};

export function TopicForm({
  programs,
  semesters,
  subjects,
  units,
  initialData,
}: Props) {
  const router = useRouter();

  /*
   * When editing an existing topic, the topic only stores unitId.
   * So we resolve:
   *
   * Topic → Unit → Subject → Semester → Program
   */

  const initialUnit = initialData
    ? units.find(
        (unit) => unit.id === initialData.unitId
      )
    : undefined;

  const initialSubject = initialUnit
    ? subjects.find(
        (subject) =>
          subject.id === initialUnit.subjectId
      )
    : undefined;

  const initialSemester = initialSubject
    ? semesters.find(
        (semester) =>
          semester.id === initialSubject.semesterId
      )
    : undefined;

  const initialProgram = initialSemester
    ? programs.find(
        (program) =>
          program.id === initialSemester.programId
      )
    : undefined;

  const [form, setForm] = useState({
    programId: initialProgram?.id ?? "",
    semesterId: initialSemester?.id ?? "",
    subjectId: initialSubject?.id ?? "",
    unitId: initialData?.unitId ?? "",
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    topicNumber: initialData?.topicNumber ?? 1,
    description: initialData?.description ?? "",
    status:
      initialData?.status ?? "active",
  });

  const [loading, setLoading] =
    useState(false);

  const filteredSemesters = useMemo(() => {
    if (!form.programId) {
      return [];
    }

    return semesters.filter(
      (semester) =>
        semester.programId ===
        form.programId
    );
  }, [
    form.programId,
    semesters,
  ]);

  const filteredSubjects = useMemo(() => {
    if (!form.semesterId) {
      return [];
    }

    return subjects.filter(
      (subject) =>
        subject.semesterId ===
        form.semesterId
    );
  }, [
    form.semesterId,
    subjects,
  ]);

  const filteredUnits = useMemo(() => {
    if (!form.subjectId) {
      return [];
    }

    return units.filter(
      (unit) =>
        unit.subjectId ===
        form.subjectId
    );
  }, [
    form.subjectId,
    units,
  ]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!form.unitId) {
      alert("Please select a unit.");
      return;
    }

    setLoading(true);

    try {
      const data = {
        unitId: form.unitId,
        title: form.title,
        slug: form.slug,
        topicNumber: Number(
          form.topicNumber
        ),
        description:
          form.description,
        status: form.status,
      };

      if (initialData) {
        await updateTopicAction(
          initialData.id,
          data
        );
      } else {
        await createTopicAction(data);
      }

      router.push("/admin/topics");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
   <form
  onSubmit={handleSubmit}
  className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          {initialData
            ? "Topic Details"
            : "Create Topic"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {initialData
            ? "Update the topic and its academic hierarchy."
            : "Configure the topic and associate it with an academic unit."}
        </p>
      </div>

      <div className="space-y-6">

        {/* Program */}
        <div>
          <label
            htmlFor="topic-program"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Program
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <select
            id="topic-program"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            value={form.programId}
            required
            onChange={(e) =>
              setForm({
                ...form,
                programId:
                  e.target.value,
                semesterId: "",
                subjectId: "",
                unitId: "",
              })
            }
          >
            <option value="">
              Select Program
            </option>

            {programs.map(
              (program) => (
                <option
                  key={program.id}
                  value={program.id}
                >
                  {program.name}
                </option>
              )
            )}
          </select>
        </div>

        {/* Semester */}
        <div>
          <label
            htmlFor="topic-semester"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Semester
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <select
            id="topic-semester"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition disabled:cursor-not-allowed disabled:bg-slate-50 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            value={form.semesterId}
            disabled={!form.programId}
            required
            onChange={(e) =>
              setForm({
                ...form,
                semesterId:
                  e.target.value,
                subjectId: "",
                unitId: "",
              })
            }
          >
            <option value="">
              Select Semester
            </option>

            {filteredSemesters.map(
              (semester) => (
                <option
                  key={semester.id}
                  value={semester.id}
                >
                  {semester.name}
                </option>
              )
            )}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="topic-subject"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Subject
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <select
            id="topic-subject"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition disabled:cursor-not-allowed disabled:bg-slate-50 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            value={form.subjectId}
            disabled={!form.semesterId}
            required
            onChange={(e) =>
              setForm({
                ...form,
                subjectId:
                  e.target.value,
                unitId: "",
              })
            }
          >
            <option value="">
              Select Subject
            </option>

            {filteredSubjects.map(
              (subject) => (
                <option
                  key={subject.id}
                  value={subject.id}
                >
                  {subject.name}
                </option>
              )
            )}
          </select>
        </div>

        {/* Unit */}
        <div>
          <label
            htmlFor="topic-unit"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Unit
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <select
            id="topic-unit"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition disabled:cursor-not-allowed disabled:bg-slate-50 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            value={form.unitId}
            disabled={!form.subjectId}
            required
            onChange={(e) =>
              setForm({
                ...form,
                unitId:
                  e.target.value,
              })
            }
          >
            <option value="">
              Select Unit
            </option>

            {filteredUnits.map(
              (unit) => (
                <option
                  key={unit.id}
                  value={unit.id}
                >
                  {unit.title}
                </option>
              )
            )}
          </select>
        </div>

        {/* Topic Title */}
        <div>
          <label
            htmlFor="topic-title"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Topic Title
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <input
            id="topic-title"
            type="text"
            placeholder="e.g. Introduction to Pharmacology"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            value={form.title}
            required
            onChange={(e) =>
              setForm({
                ...form,
                title:
                  e.target.value,
              })
            }
          />
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="topic-slug"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Slug
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <input
            id="topic-slug"
            type="text"
            placeholder="e.g. introduction-to-pharmacology"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            value={form.slug}
            required
            onChange={(e) =>
              setForm({
                ...form,
                slug:
                  e.target.value,
              })
            }
          />
        </div>

        {/* Topic Number + Status */}
        <div className="grid gap-6 sm:grid-cols-2">

          {/* Topic Number */}
          <div>
            <label
              htmlFor="topic-number"
              className="mb-2 block text-sm font-medium text-slate-900"
            >
              Topic Number
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="topic-number"
              type="number"
              min={1}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              value={form.topicNumber}
              required
              onChange={(e) =>
                setForm({
                  ...form,
                  topicNumber:
                    Number(
                      e.target.value
                    ),
                })
              }
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="topic-status"
              className="mb-2 block text-sm font-medium text-slate-900"
            >
              Status
            </label>

            <select
              id="topic-status"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status:
                    e.target.value as
                      | "active"
                      | "inactive",
                })
              }
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="topic-description"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Description
          </label>

          <textarea
            id="topic-description"
            rows={4}
            placeholder="Brief description of this topic..."
            className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={() =>
            router.back()
          }
          disabled={loading}
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? initialData
              ? "Updating..."
              : "Creating..."
            : initialData
              ? "Update Topic"
              : "Create Topic"}
        </button>
      </div>
    </form>
  );
}