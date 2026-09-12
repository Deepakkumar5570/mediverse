"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createUnitsAction,
  getUnitsBySubjectAction,
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
  slug: string;
  unitNumber: number;
  description: string | null;
  status: string;
};

type UnitDraft = {
  title: string;
  description: string;
  status: "active" | "inactive";
};

type Props = {
  programs: Program[];
  semesters: Semester[];
  subjects: Subject[];
};

function emptyDraft(): UnitDraft {
  return {
    title: "",
    description: "",
    status: "active",
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function UnitContentBuilder({
  programs,
  semesters,
  subjects,
}: Props) {
  const router = useRouter();

  const [programId, setProgramId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const [units, setUnits] = useState<Unit[]>([]);
  const [drafts, setDrafts] = useState<UnitDraft[]>([
    emptyDraft(),
  ]);

  const [loadingUnits, setLoadingUnits] = useState(false);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const filteredSemesters = useMemo(() => {
    if (!programId) return [];

    return semesters
      .filter(
        (semester) =>
          semester.programId === programId,
      )
      .sort(
        (a, b) => a.number - b.number,
      );
  }, [programId, semesters]);

  const filteredSubjects = useMemo(() => {
    if (!semesterId) return [];

    return subjects.filter(
      (subject) =>
        subject.semesterId === semesterId,
    );
  }, [semesterId, subjects]);

  const selectedProgram = programs.find(
    (program) =>
      program.id === programId,
  );

  const selectedSemester = semesters.find(
    (semester) =>
      semester.id === semesterId,
  );

  const selectedSubject = subjects.find(
    (subject) =>
      subject.id === subjectId,
  );

  const nextUnitNumber =
    units.length > 0
      ? Math.max(
          ...units.map(
            (unit) => unit.unitNumber,
          ),
        ) + 1
      : 1;

  const readyCount = drafts.filter(
    (draft) =>
      draft.title.trim().length >= 2,
  ).length;

  useEffect(() => {
    if (!subjectId) {
      setUnits([]);
      return;
    }

    let cancelled = false;

    async function loadUnits() {
      setLoadingUnits(true);
      setError("");

      try {
        const data =
          await getUnitsBySubjectAction(
            subjectId,
          );

        if (!cancelled) {
          setUnits(data ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load units.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingUnits(false);
        }
      }
    }

    loadUnits();

    return () => {
      cancelled = true;
    };
  }, [subjectId]);

  function handleProgramChange(
    value: string,
  ) {
    setProgramId(value);
    setSemesterId("");
    setSubjectId("");
    setUnits([]);
    setError("");
    setSuccess("");
  }

  function handleSemesterChange(
    value: string,
  ) {
    setSemesterId(value);
    setSubjectId("");
    setUnits([]);
    setError("");
    setSuccess("");
  }

  function handleSubjectChange(
    value: string,
  ) {
    setSubjectId(value);
    setError("");
    setSuccess("");
  }

  function updateDraft(
    index: number,
    field: keyof UnitDraft,
    value: string,
  ) {
    setDrafts((current) =>
      current.map(
        (draft, draftIndex) =>
          draftIndex === index
            ? {
                ...draft,
                [field]: value,
              }
            : draft,
      ),
    );

    setError("");
    setSuccess("");
  }

  function addAnotherUnit() {
    setDrafts((current) => [
      ...current,
      emptyDraft(),
    ]);

    setError("");
    setSuccess("");
  }

  function removeDraft(
    index: number,
  ) {
    setDrafts((current) => {
      if (current.length === 1) {
        return current;
      }

      return current.filter(
        (_, draftIndex) =>
          draftIndex !== index,
      );
    });
  }

  function clearDrafts() {
    setDrafts([emptyDraft()]);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!subjectId) {
      setError(
        "Please select a subject.",
      );
      return;
    }

    const validDrafts = drafts.filter(
      (draft) =>
        draft.title.trim().length >= 2,
    );

    if (validDrafts.length === 0) {
      setError(
        "Add at least one unit with a title.",
      );
      return;
    }

    setCreating(true);

    try {
      const created =
        await createUnitsAction({
          subjectId,

          units: validDrafts.map(
            (draft) => ({
              title:
                draft.title.trim(),

              description:
                draft.description.trim() ||
                undefined,

              status:
                draft.status,
            }),
          ),
        });

      const updated =
        await getUnitsBySubjectAction(
          subjectId,
        );

      setUnits(updated ?? []);

      setDrafts([emptyDraft()]);

      setSuccess(
        `${created.length} ${
          created.length === 1
            ? "unit"
            : "units"
        } created successfully.`,
      );

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while creating units.",
      );
    } finally {
      setCreating(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Page header */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Unit Builder
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and organize units for a subject.
          </p>
        </div>


        {/* 1. Select subject */}

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">

          <div className="border-b border-slate-200 px-5 py-5">
            <h2 className="text-base font-semibold text-slate-900">
              Select subject
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose the exact academic hierarchy
              for the units you want to create.
            </p>
          </div>


          <div className="grid gap-5 p-5 md:grid-cols-3">

            {/* Program */}

            <div>
              <label
                htmlFor="unit-program"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Program
              </label>

              <select
                id="unit-program"
                value={programId}
                onChange={(event) =>
                  handleProgramChange(
                    event.target.value,
                  )
                }
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              >
                <option value="">
                  Select program
                </option>

                {programs.map(
                  (program) => (
                    <option
                      key={program.id}
                      value={program.id}
                    >
                      {program.name}
                    </option>
                  ),
                )}
              </select>
            </div>


            {/* Semester */}

            <div>
              <label
                htmlFor="unit-semester"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Semester
              </label>

              <select
                id="unit-semester"
                value={semesterId}
                disabled={!programId}
                onChange={(event) =>
                  handleSemesterChange(
                    event.target.value,
                  )
                }
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">
                  Select semester
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


            {/* Subject */}

            <div>
              <label
                htmlFor="unit-subject"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                Subject
              </label>

              <select
                id="unit-subject"
                value={subjectId}
                disabled={!semesterId}
                onChange={(event) =>
                  handleSubjectChange(
                    event.target.value,
                  )
                }
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">
                  Select subject
                </option>

                {filteredSubjects.map(
                  (subject) => (
                    <option
                      key={subject.id}
                      value={subject.id}
                    >
                      {subject.name}
                    </option>
                  ),
                )}
              </select>
            </div>

          </div>
        </section>


        {/* Working context */}

        {subjectId &&
          selectedSubject && (
            <section className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/40 px-5 py-4">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                    Working context
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">

                    <span className="text-slate-500">
                      {selectedProgram?.name}
                    </span>

                    <span className="text-slate-300">
                      ›
                    </span>

                    <span className="text-slate-500">
                      {selectedSemester?.name}
                    </span>

                    <span className="text-slate-300">
                      ›
                    </span>

                    <span className="font-medium text-slate-900">
                      {selectedSubject.name}
                    </span>

                  </div>
                </div>


                <button
                  type="button"
                  onClick={() => {
                    setSubjectId("");
                    setUnits([]);
                    setError("");
                    setSuccess("");
                  }}
                  className="self-start text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Change subject
                </button>

              </div>
            </section>
          )}


        {/* Existing units */}

        {subjectId && (
          <section className="mt-8">

            <div className="mb-3">
              <h2 className="text-base font-semibold text-slate-900">
                Existing units
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {units.length === 0
                  ? "No units have been created yet."
                  : `${units.length} ${
                      units.length === 1
                        ? "unit"
                        : "units"
                    } already created.`}
              </p>
            </div>


            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

              {loadingUnits ? (
                <div className="px-5 py-12 text-center text-sm text-slate-500">
                  Loading units...
                </div>
              ) : units.length === 0 ? (
                <div className="px-5 py-12 text-center">

                  <p className="text-sm font-medium text-slate-700">
                    No units yet
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Add the first unit below.
                  </p>

                </div>
              ) : (
                units
                  .slice()
                  .sort(
                    (a, b) =>
                      a.unitNumber -
                      b.unitNumber,
                  )
                  .map(
                    (unit, index) => (
                      <div
                        key={unit.id}
                        className={`flex items-center gap-4 px-5 py-4 ${
                          index !==
                          units.length - 1
                            ? "border-b border-slate-100"
                            : ""
                        }`}
                      >

                        {/* Number */}

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600">
                          {unit.unitNumber}
                        </div>


                        {/* Content */}

                        <div className="min-w-0 flex-1">

                          <p className="truncate text-sm font-semibold text-slate-900">
                            {unit.title}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-400">
                            /{unit.slug}
                          </p>

                        </div>


                        {/* Edit */}

                        <a
                          href={`/admin/units/${unit.id}/edit`}
                          className="shrink-0 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        >
                          Edit
                        </a>

                      </div>
                    ),
                  )
              )}

            </div>
          </section>
        )}


        {/* Add units */}

        {subjectId && (
          <section className="mt-8">

            <div className="mb-3">
              <h2 className="text-base font-semibold text-slate-900">
                Add units
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Create units in bulk. Numbers and
                slugs are generated automatically.
              </p>
            </div>


            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >

              <div className="space-y-4 p-5">

                {drafts.map(
                  (draft, index) => {
                    const number =
                      nextUnitNumber +
                      index;

                    const slug =
                      slugify(
                        draft.title,
                      ) ||
                      "slug-preview";

                    return (
                      <div
                        key={index}
                        className="rounded-xl border border-slate-200 bg-slate-50/40 p-4 sm:p-5"
                      >

                        {/* Card header */}

                        <div className="mb-5 flex items-center gap-3">

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600">
                            {number}
                          </div>

                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              New unit
                            </p>

                            <p className="text-xs text-slate-400">
                              Unit {number}
                            </p>
                          </div>

                        </div>


                        {/* Title */}

                        <div>
                          <label
                            htmlFor={`unit-title-${index}`}
                            className="mb-2 block text-sm font-medium text-slate-900"
                          >
                            Title
                          </label>

                          <input
                            id={`unit-title-${index}`}
                            type="text"
                            value={
                              draft.title
                            }
                            onChange={(event) =>
                              updateDraft(
                                index,
                                "title",
                                event.target.value,
                              )
                            }
                            placeholder="e.g. Chromatographic Techniques"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                          />
                        </div>


                        {/* Description */}

                        <div className="mt-5">

                          <label
                            htmlFor={`unit-description-${index}`}
                            className="mb-2 block text-sm font-medium text-slate-900"
                          >
                            Description{" "}
                            <span className="font-normal text-slate-400">
                              optional
                            </span>
                          </label>

                          <textarea
                            id={`unit-description-${index}`}
                            rows={3}
                            value={
                              draft.description
                            }
                            onChange={(event) =>
                              updateDraft(
                                index,
                                "description",
                                event.target.value,
                              )
                            }
                            placeholder="Short description..."
                            className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                          />

                        </div>


                        {/* Slug preview */}

                        <div className="mt-4 rounded-lg border border-dashed border-slate-200 bg-white px-4 py-3">

                          <p className="text-xs text-slate-400">
                            Slug preview
                          </p>

                          <p className="mt-1 break-all font-mono text-xs text-slate-600">
                            {slug}
                          </p>

                        </div>


                        {/* Status */}

                        <div className="mt-4">

                          <label
                            htmlFor={`unit-status-${index}`}
                            className="mb-2 block text-sm font-medium text-slate-900"
                          >
                            Status
                          </label>

                          <select
                            id={`unit-status-${index}`}
                            value={
                              draft.status
                            }
                            onChange={(event) =>
                              updateDraft(
                                index,
                                "status",
                                event.target.value,
                              )
                            }
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                          >
                            <option value="active">
                              Active
                            </option>

                            <option value="inactive">
                              Inactive
                            </option>
                          </select>

                        </div>


                        {/* Remove */}

                        {drafts.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeDraft(
                                index,
                              )
                            }
                            className="mt-4 text-sm font-medium text-slate-500 hover:text-red-600"
                          >
                            Remove
                          </button>
                        )}

                      </div>
                    );
                  },
                )}

              </div>


              {/* Bottom actions */}

              <div className="border-t border-slate-200 px-5 py-4">

                <button
                  type="button"
                  onClick={
                    addAnotherUnit
                  }
                  disabled={creating}
                  className="flex min-h-10 w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:opacity-50"
                >
                  + Add another unit
                </button>


                {error && (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}


                {success && (
                  <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {success}
                  </div>
                )}


                <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="text-sm text-slate-500">
                    {readyCount === 0
                      ? "0 ready to create"
                      : `${readyCount} ${
                          readyCount === 1
                            ? "unit"
                            : "units"
                        } ready to create`}
                  </div>


                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={
                        clearDrafts
                      }
                      disabled={
                        creating
                      }
                      className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                      Clear
                    </button>


                    <button
                      type="submit"
                      disabled={
                        creating ||
                        readyCount ===
                          0
                      }
                      className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >
                      {creating
                        ? "Creating..."
                        : `Create ${readyCount} ${
                            readyCount ===
                            1
                              ? "Unit"
                              : "Units"
                          }`}
                    </button>

                  </div>

                </div>

              </div>

            </form>
          </section>
        )}

      </div>
    </main>
  );
}