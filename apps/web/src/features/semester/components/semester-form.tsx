"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createSemesterAction } from "../actions";

type Program = {
  id: string;
  name: string;
};

type Props = {
  programs: Program[];
};

export function SemesterForm({
  programs,
}: Props) {
  const router = useRouter();

  const [form, setForm] = useState<{
    programId: string;
    name: string;
    number: number;
    status: "active" | "inactive";
  }>({
    programId: "",
    name: "",
    number: 1,
    status: "active",
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    await createSemesterAction(form);

    router.push("/admin/semesters");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl"
    >
      <div>
        <label>Program</label>

        <select
          className="w-full border rounded p-2"
          value={form.programId}
          onChange={(e) =>
            setForm({
              ...form,
              programId: e.target.value,
            })
          }
        >
          <option value="">
            Select Program
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

      <div>
        <label>Semester Name</label>

        <input
          className="w-full border rounded p-2"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label>Semester Number</label>

        <input
          type="number"
          min={1}
          max={20}
          className="w-full border rounded p-2"
          value={form.number}
          onChange={(e) =>
            setForm({
              ...form,
              number: Number(e.target.value),
            })
          }
        />
      </div>

      <div>
        <label>Status</label>

        <select
          className="w-full border rounded p-2"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value as
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

      <button
        type="submit"
        className="rounded bg-blue-600 text-white px-4 py-2"
      >
        Create Semester
      </button>
    </form>
  );
}