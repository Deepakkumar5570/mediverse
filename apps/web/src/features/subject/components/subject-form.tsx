"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createSubjectAction } from "../actions";

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

type Props = {
    programs: Program[];
    semesters: Semester[];
};

export function SubjectForm({
    programs,
    semesters,
}: Props) {
    const router = useRouter();

    const [form, setForm] = useState({
        programId: "",
        semesterId: "",
        name: "",
        slug: "",
        code: "",
        description: "",
        status: "active" as "active" | "inactive",
    });

    const filteredSemesters = useMemo(() => {
        if (!form.programId) return [];

        return semesters.filter(
            (semester) =>
                semester.programId === form.programId
        );
    }, [form.programId, semesters]);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        const selectedSemester = semesters.find(
            (semester) =>
                semester.id === form.semesterId
        );

        if (!selectedSemester) {
            alert("Please select a semester.");
            return;
        }

        await createSubjectAction({
            semesterId: form.semesterId,

            name: form.name,

            slug: form.slug,

            code: form.code,

            description: form.description,

            semester: selectedSemester.number,

            status: form.status,
        });

        router.push("/admin/subjects");
        router.refresh();
    }
        return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl"
    >
      <div>
        <label className="block mb-1 font-medium">
          Program
        </label>

        <select
          className="w-full border rounded p-2"
          value={form.programId}
          onChange={(e) =>
            setForm({
              ...form,
              programId: e.target.value,
              semesterId: "",
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
        <label className="block mb-1 font-medium">
          Semester
        </label>

        <select
          className="w-full border rounded p-2"
          value={form.semesterId}
          disabled={!form.programId}
          onChange={(e) =>
            setForm({
              ...form,
              semesterId: e.target.value,
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

      <div>
        <label className="block mb-1 font-medium">
          Subject Name
        </label>

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
        <label className="block mb-1 font-medium">
          Slug
        </label>

        <input
          className="w-full border rounded p-2"
          value={form.slug}
          onChange={(e) =>
            setForm({
              ...form,
              slug: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Code
        </label>

        <input
          className="w-full border rounded p-2"
          value={form.code}
          onChange={(e) =>
            setForm({
              ...form,
              code: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Description
        </label>

        <textarea
          className="w-full border rounded p-2"
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Status
        </label>

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
        className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
      >
        Create Subject
      </button>
    </form>
  );
}