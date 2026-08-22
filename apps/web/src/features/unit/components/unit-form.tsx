"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createUnitAction,
  updateUnitAction,
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

type UnitData = {
  id: string;
  subjectId: string;
  title: string;
  slug: string;
  unitNumber: number;
  description: string | null;
  status: "active" | "inactive";
};

type Props = {
  programs: Program[];
  semesters: Semester[];
  subjects: Subject[];
  initialData?: UnitData;
};

export function UnitForm({
  programs,
  semesters,
  subjects,
  initialData,
}: Props) {
  const router = useRouter();

  const isEditMode = Boolean(initialData);

  const initialSubject = initialData
    ? subjects.find(
        (subject) =>
          subject.id === initialData.subjectId,
      )
    : undefined;

  const initialSemester = initialSubject
    ? semesters.find(
        (semester) =>
          semester.id === initialSubject.semesterId,
      )
    : undefined;

  const [form, setForm] = useState({
    programId: initialSemester?.programId ?? "",
    semesterId: initialSemester?.id ?? "",
    subjectId: initialData?.subjectId ?? "",
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    unitNumber: initialData?.unitNumber ?? 1,
    description: initialData?.description ?? "",
    status:
      initialData?.status ??
      ("active" as "active" | "inactive"),
  });

  const [loading, setLoading] = useState(false);

  const filteredSemesters = useMemo(() => {
    if (!form.programId) return [];

    return semesters.filter(
      (semester) =>
        semester.programId === form.programId,
    );
  }, [form.programId, semesters]);

  const filteredSubjects = useMemo(() => {
    if (!form.semesterId) return [];

    return subjects.filter(
      (subject) =>
        subject.semesterId === form.semesterId,
    );
  }, [form.semesterId, subjects]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    if (!form.subjectId) {
      alert("Please select a subject.");
      return;
    }

    setLoading(true);

    try {
      const data = {
        subjectId: form.subjectId,
        title: form.title,
        slug: form.slug,
        unitNumber: Number(form.unitNumber),
        description: form.description,
        status: form.status,
      };

      if (isEditMode && initialData) {
        await updateUnitAction(
          initialData.id,
          data,
        );
      } else {
        await createUnitAction(data);
      }

      router.push("/admin/units");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
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
          Unit Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEditMode
            ? "Update the unit information and academic placement."
            : "Configure the unit and associate it with an academic subject."}
        </p>
      </div>

      <div className="space-y-6">
        {/* Program */}
        <div>
          <label
            htmlFor="unit-program"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Program
            <span className="ml-1 text-red-500">*</span>
          </label>

          <select
            id="unit-program"
            value={form.programId}
            onChange={(e) =>
              setForm({
                ...form,
                programId: e.target.value,
                semesterId: "",
                subjectId: "",
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="">
              Select a program
            </option>

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
            htmlFor="unit-semester"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Semester
            <span className="ml-1 text-red-500">*</span>
          </label>

          <select
            id="unit-semester"
            value={form.semesterId}
            disabled={!form.programId}
            onChange={(e) =>
              setForm({
                ...form,
                semesterId: e.target.value,
                subjectId: "",
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:bg-slate-100"
          >
            <option value="">
              Select a semester
            </option>

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
            htmlFor="unit-subject"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Subject
            <span className="ml-1 text-red-500">*</span>
          </label>

          <select
            id="unit-subject"
            value={form.subjectId}
            disabled={!form.semesterId}
            onChange={(e) =>
              setForm({
                ...form,
                subjectId: e.target.value,
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:bg-slate-100"
          >
            <option value="">
              Select a subject
            </option>

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

        {/* Title */}
        <div>
          <label
            htmlFor="unit-title"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Unit Title
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="unit-title"
            type="text"
            placeholder="e.g. Introduction to Human Anatomy"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="unit-slug"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Slug
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="unit-slug"
            type="text"
            placeholder="introduction-to-human-anatomy"
            value={form.slug}
            onChange={(e) =>
              setForm({
                ...form,
                slug: e.target.value,
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        {/* Number */}
        <div>
          <label
            htmlFor="unit-number"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Unit Number
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="unit-number"
            type="number"
            min={1}
            value={form.unitNumber}
            onChange={(e) =>
              setForm({
                ...form,
                unitNumber: Number(e.target.value),
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="unit-description"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Description
          </label>

          <textarea
            id="unit-description"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="unit-status"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Status
          </label>

          <select
            id="unit-status"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as
                  | "active"
                  | "inactive",
              })
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
              ? "Update Unit"
              : "Create Unit"}
        </button>
      </div>
    </form>
  );
}