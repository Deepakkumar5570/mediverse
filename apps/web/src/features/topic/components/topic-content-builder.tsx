"use client";

import {
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import {
  createTopicsAction,
} from "../actions";

import {
  getUnitsBySubjectAction,
} from "@/src/features/unit/actions";

import {
  getTopicsByUnitAction,
} from "../actions";

import {
  getSubjectsBySemesterAction,
} from "@/src/features/subject/actions";

import {
  getSemestersByProgramAction,
} from "@/src/features/semester/actions";

import {
  getProgramsAction,
} from "@/src/features/program/actions";

import {
  getSubtopicsByTopicAction,
} from "@/src/features/subtopic/actions";


type Program = {
  id: string;
  name: string;
};

type Semester = {
  id: string;
  name: string;
};

type Subject = {
  id: string;
  name: string;
};

type Unit = {
  id: string;
  title: string;
  unitNumber: number;
};

type Topic = {
  id: string;
  title: string;
  slug: string;
  topicNumber: number;
  description?: string | null;
  status: "active" | "inactive";
};

type Row = {
  title: string;
  description: string;
  status: "active" | "inactive";
};


function slugPreview(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") ||
    "topic-slug"
  );
}


export default function TopicContentBuilder() {
  const [programs, setPrograms] =
    useState<Program[]>([]);

  const [semesters, setSemesters] =
    useState<Semester[]>([]);

  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  const [units, setUnits] =
    useState<Unit[]>([]);

  const [topics, setTopics] =
    useState<Topic[]>([]);


  const [programId, setProgramId] =
    useState("");

  const [semesterId, setSemesterId] =
    useState("");

  const [subjectId, setSubjectId] =
    useState("");

  const [unitId, setUnitId] =
    useState("");


  const [rows, setRows] = useState<Row[]>([
    {
      title: "",
      description: "",
      status: "active",
    },
  ]);


  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [isPending, startTransition] =
    useTransition();


  /**
   * Load programs.
   */
  useEffect(() => {
    async function load() {
      try {
        const data =
          await getProgramsAction();

        setPrograms(data ?? []);
      } catch {
        setError(
          "Unable to load programs.",
        );
      }
    }

    load();
  }, []);


  /**
   * Load semesters when program changes.
   */
  useEffect(() => {
    if (!programId) {
      setSemesters([]);
      return;
    }

    setSemesterId("");
    setSubjectId("");
    setUnitId("");

    setSubjects([]);
    setUnits([]);
    setTopics([]);

    async function load() {
      try {
        setLoading(true);

        const data =
          await getSemestersByProgramAction(
            programId,
          );

        setSemesters(data ?? []);
      } catch {
        setError(
          "Unable to load semesters.",
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [programId]);


  /**
   * Load subjects when semester changes.
   */
  useEffect(() => {
    if (!semesterId) {
      setSubjects([]);
      return;
    }

    setSubjectId("");
    setUnitId("");

    setUnits([]);
    setTopics([]);

    async function load() {
      try {
        setLoading(true);

        const data =
          await getSubjectsBySemesterAction(
            semesterId,
          );

        setSubjects(data ?? []);
      } catch {
        setError(
          "Unable to load subjects.",
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [semesterId]);


  /**
   * Load units when subject changes.
   */
  useEffect(() => {
    if (!subjectId) {
      setUnits([]);
      return;
    }

    setUnitId("");
    setTopics([]);

    async function load() {
      try {
        setLoading(true);

        const data =
          await getUnitsBySubjectAction(
            subjectId,
          );

        setUnits(data ?? []);
      } catch {
        setError(
          "Unable to load units.",
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [subjectId]);


  /**
   * Load existing topics when unit changes.
   */
  useEffect(() => {
    if (!unitId) {
      setTopics([]);
      return;
    }

    async function load() {
      try {
        setLoading(true);

        const data =
          await getTopicsByUnitAction(
            unitId,
          );

        setTopics(data ?? []);
      } catch {
        setError(
          "Unable to load topics.",
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [unitId]);


  /**
   * Current unit.
   */
  const currentUnit = useMemo(
    () =>
      units.find(
        (unit) => unit.id === unitId,
      ) ?? null,
    [units, unitId],
  );


  /**
   * Add new row.
   */
  function addRow() {
    setRows((current) => [
      ...current,
      {
        title: "",
        description: "",
        status: "active",
      },
    ]);
  }


  /**
   * Update row.
   */
  function updateRow(
    index: number,
    field: keyof Row,
    value: string,
  ) {
    setRows((current) =>
      current.map((row, rowIndex) =>
        rowIndex === index
          ? {
              ...row,
              [field]: value,
            }
          : row,
      ),
    );
  }


  /**
   * Remove row.
   */
  function removeRow(index: number) {
    setRows((current) =>
      current.length === 1
        ? current
        : current.filter(
            (_, rowIndex) =>
              rowIndex !== index,
          ),
    );
  }


  /**
   * Submit batch.
   */
  function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");


    if (!unitId) {
      setError(
        "Please select a unit first.",
      );
      return;
    }


    const validRows = rows.filter(
      (row) => row.title.trim().length >= 3,
    );


    if (validRows.length === 0) {
      setError(
        "Add at least one valid topic.",
      );
      return;
    }


    startTransition(async () => {
      try {
        const created =
          await createTopicsAction({
            unitId,

            topics: validRows.map(
              (row) => ({
                title: row.title.trim(),

                description:
                  row.description.trim() ||
                  undefined,

                status: row.status,
              }),
            ),
          });


        setSuccess(
          `${created.length} topic${
            created.length === 1
              ? ""
              : "s"
          } created successfully.`,
        );


        /**
         * Refresh existing topic list.
         */
        const updated =
          await getTopicsByUnitAction(
            unitId,
          );

        setTopics(updated ?? []);


        /**
         * Reset builder rows.
         */
        setRows([
          {
            title: "",
            description: "",
            status: "active",
          },
        ]);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to create topics. Please check the form and try again.",
        );
      }
    });
  }


  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Topic Builder
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Select a unit once, then add all of
          its topics together.
        </p>
      </div>


      {/* Hierarchy */}
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Select unit
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Choose the academic hierarchy for
            the topics you want to create.
          </p>
        </div>


        <div className="grid gap-5 p-6 md:grid-cols-2">

          {/* Program */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Program
            </label>

            <select
              value={programId}
              onChange={(event) =>
                setProgramId(
                  event.target.value,
                )
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">
                Select program
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
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Semester
            </label>

            <select
              value={semesterId}
              disabled={!programId}
              onChange={(event) =>
                setSemesterId(
                  event.target.value,
                )
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none disabled:bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">
                Select semester
              </option>

              {semesters.map((semester) => (
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
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Subject
            </label>

            <select
              value={subjectId}
              disabled={!semesterId}
              onChange={(event) =>
                setSubjectId(
                  event.target.value,
                )
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none disabled:bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">
                Select subject
              </option>

              {subjects.map((subject) => (
                <option
                  key={subject.id}
                  value={subject.id}
                >
                  {subject.name}
                </option>
              ))}
            </select>
          </div>


          {/* Unit */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Unit
            </label>

            <select
              value={unitId}
              disabled={!subjectId}
              onChange={(event) =>
                setUnitId(
                  event.target.value,
                )
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none disabled:bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">
                Select unit
              </option>

              {units.map((unit) => (
                <option
                  key={unit.id}
                  value={unit.id}
                >
                  Unit {unit.unitNumber} —{" "}
                  {unit.title}
                </option>
              ))}
            </select>
          </div>

        </div>
      </section>


      {/* Locked context */}
      {currentUnit && (
        <section className="rounded-xl border border-indigo-100 bg-indigo-50/40 px-6 py-5">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                Working context
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {currentUnit.title}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setUnitId("")
              }
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Change unit
            </button>

          </div>
        </section>
      )}


      {/* Existing topics */}
      {unitId && (
        <section className="rounded-xl border border-slate-200 bg-white">

          <div className="border-b border-slate-200 px-6 py-4">

            <h2 className="text-sm font-semibold text-slate-900">
              Existing topics
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Topics already created for this
              unit.
            </p>

          </div>


          {topics.length === 0 ? (
            <div className="px-6 py-8 text-sm text-slate-500">
              No topics have been created for
              this unit yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">

              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >

                  <div className="min-w-0">

                    <p className="text-sm font-medium text-slate-900">
                      {topic.topicNumber}.{" "}
                      {topic.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      /{topic.slug}
                    </p>

                  </div>


                  <a
                    href={`/admin/topics/${topic.id}/edit`}
                    className="shrink-0 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Edit
                  </a>

                </div>
              ))}

            </div>
          )}

        </section>
      )}


      {/* Builder */}
      {unitId && (
        <section className="rounded-xl border border-slate-200 bg-white">

          <div className="border-b border-slate-200 px-6 py-4">

            <h2 className="text-sm font-semibold text-slate-900">
              Add topics
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Add as many topics as you need.
              Numbers and slugs are generated
              automatically.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="p-6"
          >

            <div className="space-y-4">

              {rows.map((row, index) => {

                const previewNumber =
                  topics.length +
                  index +
                  1;

                return (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-200 p-4"
                  >

                    <div className="grid gap-4 lg:grid-cols-[64px_1fr_1fr_150px_auto]">

                      {/* Number */}
                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-500">
                          No.
                        </label>

                        <div className="flex h-10 items-center justify-center rounded-lg bg-slate-50 text-sm font-semibold text-slate-700">
                          {previewNumber}
                        </div>
                      </div>


                      {/* Title */}
                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-600">
                          Topic title
                        </label>

                        <input
                          value={row.title}
                          onChange={(event) =>
                            updateRow(
                              index,
                              "title",
                              event.target.value,
                            )
                          }
                          placeholder="e.g. Cell Structure"
                          className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />

                        <p className="mt-1 truncate text-xs text-slate-400">
                          {slugPreview(
                            row.title,
                          )}
                        </p>
                      </div>


                      {/* Description */}
                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-600">
                          Description
                        </label>

                        <input
                          value={
                            row.description
                          }
                          onChange={(event) =>
                            updateRow(
                              index,
                              "description",
                              event.target.value,
                            )
                          }
                          placeholder="Optional"
                          className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>


                      {/* Status */}
                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-600">
                          Status
                        </label>

                        <select
                          value={row.status}
                          onChange={(event) =>
                            updateRow(
                              index,
                              "status",
                              event.target.value as
                                | "active"
                                | "inactive",
                            )
                          }
                          className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
                      <div className="flex items-end">

                        <button
                          type="button"
                          disabled={
                            rows.length === 1
                          }
                          onClick={() =>
                            removeRow(index)
                          }
                          className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-500 hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>


            {/* Add row */}
            <button
              type="button"
              onClick={addRow}
              className="mt-5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              + Add another topic
            </button>


            {/* Messages */}
            {error && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}


            {success && (
              <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            )}


            {/* Submit */}
            <div className="mt-6 flex items-center justify-end border-t border-slate-100 pt-5">

              <button
                type="submit"
                disabled={
                  isPending ||
                  !unitId
                }
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending
                  ? "Creating..."
                  : `Create ${
                      rows.filter(
                        (row) =>
                          row.title.trim()
                            .length >= 3,
                      ).length
                    } Topic${
                      rows.filter(
                        (row) =>
                          row.title.trim()
                            .length >= 3,
                      ).length === 1
                        ? ""
                        : "s"
                    }`}
              </button>

            </div>

          </form>

        </section>
      )}

    </div>
  );
}