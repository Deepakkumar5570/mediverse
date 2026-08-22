"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createContentAction } from "../actions/create-content";

import {
  AutoSlug,
  ReadingTime,
  StatusSelect,
} from "../../../components/forms";

import { TiptapEditor } from "../../../components/editor";
import { updateContentAction } from "../actions/update-content";

type Program = {
  id: string;
  name: string;
};

type Semester = {
  id: string;
  programId: string;
  name: string;
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

type Topic = {
  id: string;
  unitId: string;
  title: string;
};

type Subtopic = {
  id: string;
  topicId: string;
  title: string;
};

type InitialFormData = {
  id?: string;

  programId: string;
  semesterId: string;
  subjectId: string;
  unitId: string;
  topicId: string;
  subtopicId: string;

  title: string;
  slug: string;
  summary: string;
  content: string;

  readingTime: number;

  seoTitle: string;
  seoDescription: string;

  status: "draft" | "active" | "archived";
};

type Props = {
  programs: Program[];
  semesters: Semester[];
  subjects: Subject[];
  units: Unit[];
  topics: Topic[];
  subtopics: Subtopic[];

  initialData?: InitialFormData;
};

export function ContentForm({
  programs,
  semesters,
  subjects,
  units,
  topics,
  subtopics,
  initialData,
}: Props) {
  const router = useRouter();

  const isEditing = Boolean(initialData?.id);

  const [form, setForm] = useState({
    programId: initialData?.programId ?? "",
    semesterId: initialData?.semesterId ?? "",
    subjectId: initialData?.subjectId ?? "",
    unitId: initialData?.unitId ?? "",
    topicId: initialData?.topicId ?? "",
    subtopicId: initialData?.subtopicId ?? "",

    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    summary: initialData?.summary ?? "",
    content: initialData?.content ?? "",

    readingTime: initialData?.readingTime ?? 1,

    seoTitle: initialData?.seoTitle ?? "",
    seoDescription: initialData?.seoDescription ?? "",

    status: initialData?.status ?? "draft",
  });

  useEffect(() => {
    if (!initialData) return;

    setForm({
      programId: initialData.programId,
      semesterId: initialData.semesterId,
      subjectId: initialData.subjectId,
      unitId: initialData.unitId,
      topicId: initialData.topicId,
      subtopicId: initialData.subtopicId,

      title: initialData.title,
      slug: initialData.slug,
      summary: initialData.summary,
      content: initialData.content,

      readingTime: initialData.readingTime,

      seoTitle: initialData.seoTitle,
      seoDescription: initialData.seoDescription,

      status: initialData.status,
    });
  }, [initialData]);

  const filteredSemesters = useMemo(() => {
    return semesters.filter(
      (semester) => semester.programId === form.programId
    );
  }, [form.programId, semesters]);

  const filteredSubjects = useMemo(() => {
    return subjects.filter(
      (subject) => subject.semesterId === form.semesterId
    );
  }, [form.semesterId, subjects]);

  const filteredUnits = useMemo(() => {
    return units.filter(
      (unit) => unit.subjectId === form.subjectId
    );
  }, [form.subjectId, units]);

  const filteredTopics = useMemo(() => {
    return topics.filter(
      (topic) => topic.unitId === form.unitId
    );
  }, [form.unitId, topics]);

  const filteredSubtopics = useMemo(() => {
    return subtopics.filter(
      (subtopic) => subtopic.topicId === form.topicId
    );
  }, [form.topicId, subtopics]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (initialData?.id) {
      await updateContentAction(initialData.id, {
        subtopicId: form.subtopicId,
        title: form.title,
        slug: form.slug,
        summary: form.summary,
        content: form.content,
        readingTime: form.readingTime,
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        status: form.status,
      });
    } else {
      await createContentAction({
        subtopicId: form.subtopicId,
        title: form.title,
        slug: form.slug,
        summary: form.summary,
        content: form.content,
        readingTime: form.readingTime,
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        status: form.status,
      });
    }

    router.push("/admin/contents");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* =====================================================
          ACADEMIC HIERARCHY
      ====================================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 via-white to-violet-50 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg">
              🧭
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Content Hierarchy
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Place this content inside the correct MediVerse
                academic structure.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">

          {/* PROGRAM */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Program
              <span className="ml-1 text-rose-500">*</span>
            </label>

            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              value={form.programId}
              onChange={(e) =>
                setForm({
                  ...form,
                  programId: e.target.value,
                  semesterId: "",
                  subjectId: "",
                  unitId: "",
                  topicId: "",
                  subtopicId: "",
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

          {/* SEMESTER */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Semester
              <span className="ml-1 text-rose-500">*</span>
            </label>

            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
              value={form.semesterId}
              disabled={!form.programId}
              onChange={(e) =>
                setForm({
                  ...form,
                  semesterId: e.target.value,
                  subjectId: "",
                  unitId: "",
                  topicId: "",
                  subtopicId: "",
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

          {/* SUBJECT */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Subject
              <span className="ml-1 text-rose-500">*</span>
            </label>

            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
              value={form.subjectId}
              disabled={!form.semesterId}
              onChange={(e) =>
                setForm({
                  ...form,
                  subjectId: e.target.value,
                  unitId: "",
                  topicId: "",
                  subtopicId: "",
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

          {/* UNIT */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Unit
              <span className="ml-1 text-rose-500">*</span>
            </label>

            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
              value={form.unitId}
              disabled={!form.subjectId}
              onChange={(e) =>
                setForm({
                  ...form,
                  unitId: e.target.value,
                  topicId: "",
                  subtopicId: "",
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

          {/* TOPIC */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Topic
              <span className="ml-1 text-rose-500">*</span>
            </label>

            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
              value={form.topicId}
              disabled={!form.unitId}
              onChange={(e) =>
                setForm({
                  ...form,
                  topicId: e.target.value,
                  subtopicId: "",
                })
              }
            >
              <option value="">Select Topic</option>

              {filteredTopics.map((topic) => (
                <option
                  key={topic.id}
                  value={topic.id}
                >
                  {topic.title}
                </option>
              ))}
            </select>
          </div>

          {/* SUBTOPIC */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Subtopic
              <span className="ml-1 text-rose-500">*</span>
            </label>

            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
              value={form.subtopicId}
              disabled={!form.topicId}
              onChange={(e) =>
                setForm({
                  ...form,
                  subtopicId: e.target.value,
                })
              }
            >
              <option value="">Select Subtopic</option>

              {filteredSubtopics.map((subtopic) => (
                <option
                  key={subtopic.id}
                  value={subtopic.id}
                >
                  {subtopic.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CURRENT PATH */}
        {form.subtopicId && (
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Content will be published under
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {[
                programs.find((item) => item.id === form.programId)?.name,
                semesters.find((item) => item.id === form.semesterId)?.name,
                subjects.find((item) => item.id === form.subjectId)?.name,
                units.find((item) => item.id === form.unitId)?.title,
                topics.find((item) => item.id === form.topicId)?.title,
                subtopics.find(
                  (item) => item.id === form.subtopicId
                )?.title,
              ]
                .filter(Boolean)
                .map((item, index, array) => (
                  <span
                    key={`${item}-${index}`}
                    className="flex items-center gap-2"
                  >
                    <span className="rounded-lg bg-white px-2.5 py-1.5 font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
                      {item}
                    </span>

                    {index < array.length - 1 && (
                      <span className="text-slate-300">
                        →
                      </span>
                    )}
                  </span>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          BASIC INFORMATION
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-lg">
            ✨
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Content Details
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Give your educational resource a clear identity.
            </p>
          </div>
        </div>

        <div className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Title
              <span className="ml-1 text-rose-500">*</span>
            </label>

            <input
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              value={form.title}
              placeholder="e.g. Introduction to Pharmacology"
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Slug
              <span className="ml-1 text-rose-500">*</span>
            </label>

            <AutoSlug
              title={form.title}
              slug={form.slug}
              onChange={(slug) =>
                setForm({
                  ...form,
                  slug,
                })
              }
            />

            <p className="mt-2 text-[11px] text-slate-400">
              Used in the public URL for this content.
            </p>
          </div>

          {/* SUMMARY */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Summary
            </label>

            <textarea
              rows={4}
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              value={form.summary}
              placeholder="Give students a short overview of what they will learn..."
              onChange={(e) =>
                setForm({
                  ...form,
                  summary: e.target.value,
                })
              }
            />

            <div className="mt-2 flex justify-end">
              <span className="text-[11px] text-slate-400">
                {form.summary.length} characters
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT EDITOR
      ====================================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-indigo-50/80 via-white to-violet-50/80 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
              📝
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Article Content
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Write the actual educational material students will read.
              </p>
            </div>
          </div>

          <div className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm ring-1 ring-slate-200">
            {form.content
              ? "Content ready"
              : "Start writing"}
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-inner">
            <TiptapEditor
              value={form.content}
              onChange={(content) =>
                setForm({
                  ...form,
                  content,
                })
              }
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          PUBLISHING
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg">
            🚀
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Publishing
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Control how this content appears in MediVerse.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* READING TIME */}
          <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-4">
            <div className="mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                Reading Time
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Estimated automatically from the article.
              </p>
            </div>

            <ReadingTime
              html={form.content}
              value={form.readingTime}
              onChange={(minutes) =>
                setForm({
                  ...form,
                  readingTime: minutes,
                })
              }
            />
          </div>

          {/* STATUS */}
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
            <div className="mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Publishing Status
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Decide whether students can access this content.
              </p>
            </div>

            <StatusSelect
              value={form.status}
              onChange={(status) =>
                setForm({
                  ...form,
                  status,
                })
              }
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          SEO
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-lg">
            🔎
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Search & SEO
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Help students discover this content through search.
            </p>
          </div>
        </div>

        <div className="space-y-5">

          {/* SEO TITLE */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              SEO Title
            </label>

            <input
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              value={form.seoTitle}
              placeholder="SEO-friendly title"
              onChange={(e) =>
                setForm({
                  ...form,
                  seoTitle: e.target.value,
                })
              }
            />

            <div className="mt-2 flex justify-between text-[11px] text-slate-400">
              <span>Recommended: concise and descriptive</span>
              <span>{form.seoTitle.length} chars</span>
            </div>
          </div>

          {/* SEO DESCRIPTION */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              SEO Description
            </label>

            <textarea
              rows={4}
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              value={form.seoDescription}
              placeholder="Short description for search engines..."
              onChange={(e) =>
                setForm({
                  ...form,
                  seoDescription: e.target.value,
                })
              }
            />

            <div className="mt-2 flex justify-end text-[11px] text-slate-400">
              {form.seoDescription.length} chars
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ACTION BAR
      ====================================================== */}

      <div className="sticky bottom-4 z-20">
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl shadow-slate-900/10 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {isEditing
                ? "Ready to update?"
                : "Ready to publish?"}
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              {form.status === "active"
                ? "This content will be available as active content."
                : "You can change the publishing status before saving."}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.push("/admin/contents")}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-slate-950 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-indigo-600"
            >
              {isEditing
                ? "Save Changes"
                : "Create Content"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}