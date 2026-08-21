"use client";

import { createProgramAction } from "../actions/create-program";
import { updateProgramAction } from "../actions/update-program";

type ProgramFormData = {
  id: string;
  name: string;
  slug: string;
  code: string;
  description: string | null;
  duration: number;
  status: "active" | "inactive";
  icon?: string | null;
  color?: string | null;
};

type ProgramFormProps = {
  initialData?: ProgramFormData;
};

export function ProgramForm({
  initialData,
}: ProgramFormProps) {
  const isEditMode = Boolean(initialData);

  return (
    <form
      action={
        isEditMode
          ? updateProgramAction
          : createProgramAction
      }
      className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      {initialData && (
        <input
          type="hidden"
          name="id"
          value={initialData.id}
        />
      )}

      {/* Basic Information */}
      <div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {isEditMode
              ? "Update the academic program information."
              : "Add the basic details of the academic program."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Program Name
            </label>

            <input
              id="name"
              name="name"
              defaultValue={initialData?.name ?? ""}
              placeholder="e.g. Bachelor of Pharmacy"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="code"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Program Code
            </label>

            <input
              id="code"
              name="code"
              defaultValue={initialData?.code ?? ""}
              placeholder="e.g. BPHARM"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm uppercase outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Slug
            </label>

            <input
              id="slug"
              name="slug"
              defaultValue={initialData?.slug ?? ""}
              placeholder="e.g. b-pharm"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
              required
            />

            <p className="mt-2 text-xs text-slate-400">
              Used in the program URL.
            </p>
          </div>

          <div>
            <label
              htmlFor="duration"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Duration
            </label>

            <div className="relative">
              <input
                id="duration"
                type="number"
                name="duration"
                min={1}
                defaultValue={initialData?.duration ?? 1}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-20 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
                required
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                Years
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-slate-100 pt-8">
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={initialData?.description ?? ""}
          placeholder="Describe this academic program..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
        />
      </div>

      {/* Appearance */}
      <div className="border-t border-slate-100 pt-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Appearance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Customize how this program is represented in
            MediVerse.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="icon"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Icon
            </label>

            <input
              id="icon"
              name="icon"
              defaultValue={initialData?.icon ?? ""}
              placeholder="e.g. 📚"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label
              htmlFor="color"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Color
            </label>

            <div className="flex gap-3">
              <input
                id="color"
                type="color"
                name="color"
                defaultValue={
                  initialData?.color ?? "#2563eb"
                }
                className="h-12 w-16 cursor-pointer rounded-xl border border-slate-200 bg-white p-1"
              />

              <div className="flex flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500">
                Program accent color
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="border-t border-slate-100 pt-8">
        <label
          htmlFor="status"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Status
        </label>

        <select
          id="status"
          name="status"
          defaultValue={initialData?.status ?? "active"}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 md:max-w-sm"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <p className="mt-2 text-xs text-slate-400">
          Inactive programs can remain in the system without
          being presented as active learning programs.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-8">
        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50"
        >
          {isEditMode
            ? "Update Program"
            : "Create Program"}
        </button>
      </div>
    </form>
  );
}