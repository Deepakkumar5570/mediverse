"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createSubjectAction,
  updateSubjectAction,
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

type SubjectData = {
  id: string;
  semesterId: string;
  name: string;
  slug: string;
  code: string;
  description: string | null;
  semester: number;
  status: "active" | "inactive";
};

type Props = {
  programs: Program[];
  semesters: Semester[];
  initialData?: SubjectData;
};

export function SubjectForm({
  programs,
  semesters,
  initialData,
}: Props) {
  const router = useRouter();

  const isEditMode = Boolean(initialData);

  const initialSemester = initialData
    ? semesters.find(
        (semester) =>
          semester.id === initialData.semesterId,
      )
    : undefined;

  const [form, setForm] = useState({
    programId: initialSemester?.programId ?? "",
    semesterId: initialData?.semesterId ?? "",
    name: initialData?.name ?? "",
    slug: initialData?.slug ?? "",
    code: initialData?.code ?? "",
    description: initialData?.description ?? "",
    status:
      initialData?.status ?? ("active" as "active" | "inactive"),
  });

  const [loading, setLoading] = useState(false);

  const filteredSemesters = useMemo(() => {
    if (!form.programId) {
      return [];
    }

    return semesters.filter(
      (semester) =>
        semester.programId === form.programId,
    );
  }, [form.programId, semesters]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    const selectedSemester = semesters.find(
      (semester) =>
        semester.id === form.semesterId,
    );

    if (!selectedSemester) {
      alert("Please select a semester.");
      return;
    }

    setLoading(true);

    try {
      const data = {
        semesterId: form.semesterId,
        name: form.name,
        slug: form.slug,
        code: form.code,
        description: form.description,
        semester: selectedSemester.number,
        status: form.status,
      };

      if (isEditMode && initialData) {
        await updateSubjectAction(
          initialData.id,
          data,
        );
      } else {
        await createSubjectAction(data);
      }

      router.push("/admin/subjects");
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
          Subject Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEditMode
            ? "Update the subject information and academic placement."
            : "Configure the subject and associate it with an academic semester."}
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
            <span className="ml-1 text-red-500">*</span>
          </label>

          <select
            id="program"
            value={form.programId}
            onChange={(e) =>
              setForm({
                ...form,
                programId: e.target.value,
                semesterId: "",
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
            htmlFor="semester"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Semester
            <span className="ml-1 text-red-500">*</span>
          </label>

          <select
            id="semester"
            value={form.semesterId}
            disabled={!form.programId}
            onChange={(e) =>
              setForm({
                ...form,
                semesterId: e.target.value,
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:bg-slate-100"
          >
            <option value="">
              Select a semester
            </option>

            {filteredSemesters.map(
              (semester) => (
                <option
                  key={semester.id}
                  value={semester.id}
                >
                  {semester.name}
                </option>
              ),
            )}
          </select>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="subject-name"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Subject Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="subject-name"
            type="text"
            placeholder="e.g. Human Anatomy"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="subject-slug"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Slug
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="subject-slug"
            type="text"
            placeholder="human-anatomy"
            value={form.slug}
            onChange={(e) =>
              setForm({
                ...form,
                slug: e.target.value,
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        {/* Code */}
        <div>
          <label
            htmlFor="subject-code"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Code
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="subject-code"
            type="text"
            placeholder="BP101T"
            value={form.code}
            onChange={(e) =>
              setForm({
                ...form,
                code: e.target.value,
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="subject-description"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Description
          </label>

          <textarea
            id="subject-description"
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
            htmlFor="subject-status"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Status
          </label>

          <select
            id="subject-status"
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
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
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
              ? "Update Subject"
              : "Create Subject"}
        </button>
      </div>
    </form>
  );
}