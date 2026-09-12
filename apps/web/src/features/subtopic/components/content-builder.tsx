"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { createSubtopicsAction } from "../actions/create-subtopics";

type Program = {
  id: string;
  name: string;
};

type Semester = {
  id: string;
  name: string;
  programId: string;
};

type Subject = {
  id: string;
  name: string;
  semesterId: string;
};

type Unit = {
  id: string;
  title: string;
  unitNumber: number;
  subjectId: string;
};

type Topic = {
  id: string;
  title: string;
  topicNumber: number;
  unitId: string;
};

type ExistingSubtopic = {
  id: string;
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
  selectedTopicId?: string;
  selectedTopic?: Topic | null;
  existingSubtopics: ExistingSubtopic[];
  context?: {
    program?: Program;
    semester?: Semester;
    subject?: Subject;
    unit?: Unit;
    topic?: Topic;
  };
};

type DraftSubtopic = {
  id: string;
  title: string;
  description: string;
};

function slugPreview(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "slug-preview"
  );
}

function createDraft(): DraftSubtopic {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
  };
}

export function ContentBuilder({
  programs,
  semesters,
  subjects,
  units,
  topics,
  selectedTopicId,
  existingSubtopics,
  context,
}: Props) {
  const router = useRouter();

  const [programId, setProgramId] = useState(
    context?.program?.id ?? "",
  );
  const [semesterId, setSemesterId] = useState(
    context?.semester?.id ?? "",
  );
  const [subjectId, setSubjectId] = useState(
    context?.subject?.id ?? "",
  );
  const [unitId, setUnitId] = useState(
    context?.unit?.id ?? "",
  );
  const [topicId, setTopicId] = useState(
    selectedTopicId ?? "",
  );

  const [rows, setRows] = useState<DraftSubtopic[]>([
    createDraft(),
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const filteredSemesters = useMemo(
    () =>
      semesters.filter(
        (semester) => semester.programId === programId,
      ),
    [semesters, programId],
  );

  const filteredSubjects = useMemo(
    () =>
      subjects.filter(
        (subject) => subject.semesterId === semesterId,
      ),
    [subjects, semesterId],
  );

  const filteredUnits = useMemo(
    () =>
      units.filter(
        (unit) => unit.subjectId === subjectId,
      ),
    [units, subjectId],
  );

  const filteredTopics = useMemo(
    () =>
      topics.filter(
        (topic) => topic.unitId === unitId,
      ),
    [topics, unitId],
  );

  const nextNumber =
    existingSubtopics.length > 0
      ? Math.max(
          ...existingSubtopics.map(
            (subtopic) => subtopic.subtopicNumber,
          ),
        ) + 1
      : 1;

  function handleTopicSelect(value: string) {
    setTopicId(value);

    if (!value) {
      router.push("/admin/content-builder");
      return;
    }

    router.push(
      `/admin/content-builder?topicId=${encodeURIComponent(value)}`,
    );
  }

  function updateRow(
    id: string,
    field: keyof DraftSubtopic,
    value: string,
  ) {
    setRows((current) =>
      current.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: value,
            }
          : row,
      ),
    );
  }

  function addRow() {
    setRows((current) => [...current, createDraft()]);
  }

  function removeRow(id: string) {
    setRows((current) => {
      if (current.length === 1) {
        return current;
      }

      return current.filter((row) => row.id !== id);
    });
  }

  async function handleCreate() {
    if (!topicId) {
      setError("Please select a topic first.");
      return;
    }

    const validRows = rows.filter(
      (row) => row.title.trim().length >= 2,
    );

    if (validRows.length === 0) {
      setError("Add at least one subtopic title.");
      return;
    }

    setError("");
    setIsCreating(true);

    try {
      await createSubtopicsAction({
        topicId,
        subtopics: validRows.map((row) => ({
          title: row.title.trim(),
          description:
            row.description.trim() || undefined,
          status: "active",
        })),
      });

      setRows([createDraft()]);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while creating subtopics.",
      );
    } finally {
      setIsCreating(false);
    }
  }

  if (!selectedTopicId) {
    return (
      <section className="mx-auto max-w-6xl space-y-6">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Curriculum Builder
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
            Choose where you want to work
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Select the curriculum location once. After that,
            MediVerse will keep the context locked while you add
            multiple subtopics.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              label="Program"
              value={programId}
              onChange={(value) => {
                setProgramId(value);
                setSemesterId("");
                setSubjectId("");
                setUnitId("");
                setTopicId("");
              }}
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
            </SelectField>

            <SelectField
              label="Semester"
              value={semesterId}
              disabled={!programId}
              onChange={(value) => {
                setSemesterId(value);
                setSubjectId("");
                setUnitId("");
                setTopicId("");
              }}
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
            </SelectField>

            <SelectField
              label="Subject"
              value={subjectId}
              disabled={!semesterId}
              onChange={(value) => {
                setSubjectId(value);
                setUnitId("");
                setTopicId("");
              }}
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
            </SelectField>

            <SelectField
              label="Unit"
              value={unitId}
              disabled={!subjectId}
              onChange={(value) => {
                setUnitId(value);
                setTopicId("");
              }}
            >
              <option value="">Select Unit</option>

              {filteredUnits.map((unit) => (
                <option
                  key={unit.id}
                  value={unit.id}
                >
                  Unit {unit.unitNumber} — {unit.title}
                </option>
              ))}
            </SelectField>

            <div className="md:col-span-2">
              <SelectField
                label="Topic"
                value={topicId}
                disabled={!unitId}
                onChange={handleTopicSelect}
              >
                <option value="">Select Topic</option>

                {filteredTopics.map((topic) => (
                  <option
                    key={topic.id}
                    value={topic.id}
                  >
                    Topic {topic.topicNumber} — {topic.title}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Curriculum Builder
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
            Subtopics
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add as many subtopics as your curriculum needs without
            repeating the parent hierarchy.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            router.push("/admin/content-builder")
          }
          className="w-fit rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Change context
        </button>
      </div>

      {/* Locked context */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
          Working context
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <ContextItem label={context?.program?.name} />

          <span className="text-slate-400">›</span>

          <ContextItem label={context?.semester?.name} />

          <span className="text-slate-400">›</span>

          <ContextItem label={context?.subject?.name} />

          <span className="text-slate-400">›</span>

          <ContextItem
            label={`Unit ${context?.unit?.unitNumber} — ${context?.unit?.title}`}
          />

          <span className="text-slate-400">›</span>

          <ContextItem
            label={`Topic ${context?.topic?.topicNumber} — ${context?.topic?.title}`}
            strong
          />
        </div>
      </div>

      {/* Existing */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-950">
                Existing subtopics
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {existingSubtopics.length} subtopic
                {existingSubtopics.length === 1 ? "" : "s"} in
                this topic
              </p>
            </div>
          </div>
        </div>

        {existingSubtopics.length === 0 ? (
          <div className="px-5 py-8 text-sm text-slate-500">
            No subtopics yet. Create the first ones below.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {existingSubtopics.map((subtopic) => (
              <div
                key={subtopic.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-600">
                    {subtopic.subtopicNumber}
                  </span>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900">
                      {subtopic.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-400">
                      {subtopic.slug}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/admin/subtopics/${subtopic.id}/edit`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-950">
            Add subtopics
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Numbering and slugs will be generated automatically.
          </p>
        </div>

        <div className="space-y-4 p-5">
          {rows.map((row, index) => {
            const previewNumber = nextNumber + index;

            return (
              <div
                key={row.id}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs font-semibold text-slate-600 shadow-sm">
                      {previewNumber}
                    </span>

                    <span className="text-sm font-medium text-slate-700">
                      New subtopic
                    </span>
                  </div>

                  {rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      className="text-xs font-medium text-slate-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="mt-4 grid gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Title
                    </label>

                    <input
                      value={row.title}
                      onChange={(event) =>
                        updateRow(
                          row.id,
                          "title",
                          event.target.value,
                        )
                      }
                      placeholder="e.g. Intercellular Signaling Mechanisms"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Description
                      <span className="ml-1 font-normal text-slate-400">
                        optional
                      </span>
                    </label>

                    <textarea
                      value={row.description}
                      onChange={(event) =>
                        updateRow(
                          row.id,
                          "description",
                          event.target.value,
                        )
                      }
                      rows={2}
                      placeholder="Short description..."
                      className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div className="rounded-lg border border-dashed border-slate-200 bg-white px-3 py-2.5">
                    <span className="text-xs font-medium text-slate-400">
                      Slug preview
                    </span>

                    <p className="mt-1 font-mono text-xs text-slate-600">
                      {slugPreview(row.title)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={addRow}
            className="w-full rounded-lg border border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50/40 hover:text-indigo-700"
          >
            + Add another subtopic
          </button>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              {rows.filter(
                (row) => row.title.trim().length >= 2,
              ).length}{" "}
              ready to create
            </p>

            <button
              type="button"
              onClick={handleCreate}
              disabled={isCreating}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCreating
                ? "Creating..."
                : `Create ${
                    rows.filter(
                      (row) => row.title.trim().length >= 2,
                    ).length
                  } Subtopics`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectField({
  label,
  value,
  onChange,
  disabled,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      >
        {children}
      </select>
    </div>
  );
}

function ContextItem({
  label,
  strong = false,
}: {
  label?: string;
  strong?: boolean;
}) {
  return (
    <span
      className={
        strong
          ? "rounded-md bg-white px-2.5 py-1.5 font-semibold text-indigo-700 shadow-sm"
          : "text-slate-600"
      }
    >
      {label ?? "—"}
    </span>
  );
}