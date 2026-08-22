"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createSubtopicAction,
  updateSubtopicAction,
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

type Topic = {
  id: string;
  unitId: string;
  title: string;
};

type Subtopic = {
  id: string;
  topicId: string;
  title: string;
  slug: string;
  subtopicNumber: number;
  description: string | null;
  status: "active" | "inactive";
};

type Props = {
  programs: Program[];
  semesters: Semester[];
  subjects: Subject[];
  units: Unit[];
  topics: Topic[];
  initialData?: Subtopic;
  initialHierarchy?: {
    programId: string;
    semesterId: string;
    subjectId: string;
    unitId: string;
    topicId: string;
  };
};

export function SubtopicForm({
  programs,
  semesters,
  subjects,
  units,
  topics,
  initialData,
  initialHierarchy,
}: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
   programId: initialHierarchy?.programId ?? "",
    semesterId: initialHierarchy?.semesterId ?? "",
    subjectId: initialHierarchy?.subjectId ?? "",
    unitId: initialHierarchy?.unitId ?? "",
    topicId: initialHierarchy?.topicId ?? "",
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    subtopicNumber: initialData?.subtopicNumber ?? 1,
    description: initialData?.description ?? "",
    status: initialData?.status ?? ("active" as "active" | "inactive"),
  });

  const [loading, setLoading] = useState(false);

  const filteredSemesters = useMemo(() => {
    if (!form.programId) return [];

    return semesters.filter(
      (semester) => semester.programId === form.programId,
    );
  }, [form.programId, semesters]);

  const filteredSubjects = useMemo(() => {
    if (!form.semesterId) return [];

    return subjects.filter(
      (subject) => subject.semesterId === form.semesterId,
    );
  }, [form.semesterId, subjects]);

  const filteredUnits = useMemo(() => {
    if (!form.subjectId) return [];

    return units.filter(
      (unit) => unit.subjectId === form.subjectId,
    );
  }, [form.subjectId, units]);

  const filteredTopics = useMemo(() => {
    if (!form.unitId) return [];

    return topics.filter(
      (topic) => topic.unitId === form.unitId,
    );
  }, [form.unitId, topics]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    if (!form.topicId) {
      alert("Please select a topic.");
      return;
    }

    setLoading(true);

    try {
      const data = {
        topicId: form.topicId,
        title: form.title,
        slug: form.slug,
        subtopicNumber: Number(form.subtopicNumber),
        description: form.description,
        status: form.status,
      };

      if (initialData) {
        await updateSubtopicAction(
          initialData.id,
          data,
        );
      } else {
        await createSubtopicAction(data);
      }

      router.push("/admin/subtopics");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          {initialData
            ? "Edit Subtopic"
            : "Subtopic Details"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure the subtopic and its academic hierarchy.
        </p>
      </div>

      <div className="space-y-6">
        {/* Program */}
        <div>
          <label
            htmlFor="program"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Program
          </label>

          <select
            id="program"
            value={form.programId}
            onChange={(e) =>
              setForm({
                ...form,
                programId: e.target.value,
                semesterId: "",
                subjectId: "",
                unitId: "",
                topicId: "",
              })
            }
            disabled={Boolean(initialData)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
          >
            <option value="">Select Program</option>

            {programs.map((program) => (
              <option
                key={program.id}
                value={program.id}
              >
                {program.name}
              </option>
            ))}
          </select>
        </div>

        {/* Semester */}
        <div>
          <label
            htmlFor="semester"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Semester
          </label>

          <select
            id="semester"
            value={form.semesterId}
           disabled={!form.programId}
            onChange={(e) =>
              setForm({
                ...form,
                semesterId: e.target.value,
                subjectId: "",
                unitId: "",
                topicId: "",
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
          >
            <option value="">Select Semester</option>

            {filteredSemesters.map((semester) => (
              <option
                key={semester.id}
                value={semester.id}
              >
                {semester.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Subject
          </label>

          <select
            id="subject"
            value={form.subjectId}
         disabled={!form.semesterId}
            onChange={(e) =>
              setForm({
                ...form,
                subjectId: e.target.value,
                unitId: "",
                topicId: "",
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
          >
            <option value="">Select Subject</option>

            {filteredSubjects.map((subject) => (
              <option
                key={subject.id}
                value={subject.id}
              >
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Unit */}
        <div>
          <label
            htmlFor="unit"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Unit
          </label>

          <select
            id="unit"
            value={form.unitId}
            disabled={!form.subjectId}
            onChange={(e) =>
              setForm({
                ...form,
                unitId: e.target.value,
                topicId: "",
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
          >
            <option value="">Select Unit</option>

            {filteredUnits.map((unit) => (
              <option
                key={unit.id}
                value={unit.id}
              >
                {unit.title}
              </option>
            ))}
          </select>
        </div>

        {/* Topic */}
        <div>
          <label
            htmlFor="topic"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Topic
          </label>

          <select
            id="topic"
            value={form.topicId}
         disabled={!form.unitId}
            onChange={(e) =>
              setForm({
                ...form,
                topicId: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
          >
            <option value="">Select Topic</option>

            {filteredTopics.map((topic) => (
              <option
                key={topic.id}
                value={topic.id}
              >
                {topic.title}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="subtopic-title"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Subtopic Title
          </label>

          <input
            id="subtopic-title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
          />
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="subtopic-slug"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Slug
          </label>

          <input
            id="subtopic-slug"
            value={form.slug}
            onChange={(e) =>
              setForm({
                ...form,
                slug: e.target.value,
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
          />
        </div>

        {/* Number */}
        <div>
          <label
            htmlFor="subtopic-number"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Subtopic Number
          </label>

          <input
            id="subtopic-number"
            type="number"
            min={1}
            value={form.subtopicNumber}
            onChange={(e) =>
              setForm({
                ...form,
                subtopicNumber: Number(e.target.value),
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="subtopic-description"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Description
          </label>

          <textarea
            id="subtopic-description"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="subtopic-status"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Status
          </label>

          <select
            id="subtopic-status"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as
                  | "active"
                  | "inactive",
              })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex gap-3 border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          {loading
            ? initialData
              ? "Updating..."
              : "Creating..."
            : initialData
              ? "Update Subtopic"
              : "Create Subtopic"}
        </button>
      </div>
    </form>
  );
}