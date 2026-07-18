"use client";

import { createProgramAction } from "../actions/create-program";

export function ProgramForm() {
  return (
    <form
      action={createProgramAction}
      className="space-y-6 rounded-lg border p-6"
    >
      <div>
        <label className="mb-2 block font-medium">
          Name
        </label>

        <input
          name="name"
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Slug
        </label>

        <input
          name="slug"
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Code
        </label>

        <input
          name="code"
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          name="description"
          rows={4}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Duration (Years)
        </label>

        <input
          type="number"
          name="duration"
          min={1}
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Status
        </label>

        <select
          name="status"
          defaultValue="active"
          className="w-full rounded border p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Icon
        </label>

        <input
          name="icon"
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Color
        </label>

        <input
          type="color"
          name="color"
          defaultValue="#2563eb"
          className="h-12 w-full rounded border"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-black px-6 py-3 text-white"
      >
        Save Program
      </button>
    </form>
  );
}