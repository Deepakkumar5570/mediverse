"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createTopicAction } from "../actions";

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

type Props = {
  programs: Program[];
  semesters: Semester[];
  subjects: Subject[];
  units: Unit[];
};

export function TopicForm({
  programs,
  semesters,
  subjects,
  units,
}: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    programId: "",
    semesterId: "",
    subjectId: "",
    unitId: "",
    title: "",
    slug: "",
    topicNumber: 1,
    description: "",
    status: "active" as "active" | "inactive",
  });

  const filteredSemesters = useMemo(() => {
    if (!form.programId) return [];

    return semesters.filter(
      (semester) => semester.programId === form.programId
    );
  }, [form.programId, semesters]);

  const filteredSubjects = useMemo(() => {
    if (!form.semesterId) return [];

    return subjects.filter(
      (subject) => subject.semesterId === form.semesterId
    );
  }, [form.semesterId, subjects]);

  const filteredUnits = useMemo(() => {
    if (!form.subjectId) return [];

    return units.filter(
      (unit) => unit.subjectId === form.subjectId
    );
  }, [form.subjectId, units]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    await createTopicAction({
      unitId: form.unitId,
      title: form.title,
      slug: form.slug,
      topicNumber: Number(form.topicNumber),
      description: form.description,
      status: form.status,
    });

    router.push("/admin/topics");
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
              subjectId: "",
              unitId: "",
            })
          }
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
              subjectId: "",
              unitId: "",
            })
          }
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

      <div>
        <label className="block mb-1 font-medium">
          Subject
        </label>

        <select
          className="w-full border rounded p-2"
          value={form.subjectId}
          disabled={!form.semesterId}
          onChange={(e) =>
            setForm({
              ...form,
              subjectId: e.target.value,
              unitId: "",
            })
          }
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

      <div>
        <label className="block mb-1 font-medium">
          Unit
        </label>

        <select
          className="w-full border rounded p-2"
          value={form.unitId}
          disabled={!form.subjectId}
          onChange={(e) =>
            setForm({
              ...form,
              unitId: e.target.value,
            })
          }
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

      <div>
        <label className="block mb-1 font-medium">
          Topic Title
        </label>

        <input
          className="w-full border rounded p-2"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
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
          Topic Number
        </label>

        <input
          type="number"
          min={1}
          className="w-full border rounded p-2"
          value={form.topicNumber}
          onChange={(e) =>
            setForm({
              ...form,
              topicNumber: Number(e.target.value),
            })
          }
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Description
        </label>

        <textarea
          rows={4}
          className="w-full border rounded p-2"
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
      >
        Create Topic
      </button>
    </form>
  );
}