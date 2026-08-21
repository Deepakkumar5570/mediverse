"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createSemesterAction,
  updateSemesterAction,
} from "../actions";

type Program = {
  id: string;
  name: string;
};

type SemesterData = {
  id: string;
  programId: string;
  name: string;
  number: number;
  status: "active" | "inactive";
};

type Props = {
  programs: Program[];
  initialData?: SemesterData;
};

export function SemesterForm({
  programs,
  initialData,
}: Props) {
  const router = useRouter();

  const isEditMode = Boolean(initialData);

  const [form, setForm] = useState<{
    programId: string;
    name: string;
    number: number;
    status: "active" | "inactive";
  }>({
    programId: initialData?.programId ?? "",
    name: initialData?.name ?? "",
    number: initialData?.number ?? 1,
    status: initialData?.status ?? "active",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      if (isEditMode && initialData) {
        await updateSemesterAction(
          initialData.id,
          form,
        );
      } else {
        await createSemesterAction(form);
      }

      router.push("/admin/semesters");
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
          {isEditMode
            ? "Update Semester"
            : "Semester Details"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEditMode
            ? "Update the academic semester information."
            : "Configure the semester and associate it with an academic program."}
        </p>
      </div>

      <div className="space-y-6">
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
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="">Select a program</option>

            {programs.map((program) => (
              <option
                key={program.id}
                value={program.id}
              >
                {program.name}
              </option>
            ))}
          </select>

          <p className="mt-2 text-xs text-slate-500">
            Choose the medical program this semester belongs to.
          </p>
        </div>

        <div>
          <label
            htmlFor="semester-name"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            Semester Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="semester-name"
            type="text"
            placeholder="e.g. First Semester"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="semester-number"
              className="mb-2 block text-sm font-medium text-slate-900"
            >
              Semester Number
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="semester-number"
              type="number"
              min={1}
              max={20}
              value={form.number}
              onChange={(e) =>
                setForm({
                  ...form,
                  number: Number(e.target.value),
                })
              }
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            />

            <p className="mt-2 text-xs text-slate-500">
              Position of this semester in the program.
            </p>
          </div>

          <div>
            <label
              htmlFor="semester-status"
              className="mb-2 block text-sm font-medium text-slate-900"
            >
              Status
            </label>

            <select
              id="semester-status"
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as
                    | "active"
                    | "inactive",
                })
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
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
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
              ? "Update Semester"
              : "Create Semester"}
        </button>
      </div>
    </form>
  );
}