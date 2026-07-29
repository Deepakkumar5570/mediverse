


"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { createContentAction } from "../actions/create-content";

import { AutoSlug } from "../../../components/forms";
import {
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
  // const [form, setForm] = useState({
  //   programId: "",
  //   semesterId: "",
  //   subjectId: "",
  //   unitId: "",
  //   topicId: "",
  //   subtopicId: "",

  //   title: "",
  //   slug: "",
  //   summary: "",
  //   content: "",

  //   readingTime: 1,

  //   seoTitle: "",

  //   seoDescription: "",

  //   status: "draft" as
  //     | "draft"
  //     | "active"
  //     | "archived",
  // });


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
      semester => semester.programId === form.programId
    );
  }, [form.programId, semesters]);

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

  const filteredSubjects = useMemo(() => {
    return subjects.filter(
      (subject) =>
        subject.semesterId === form.semesterId
    );
  }, [form.semesterId, subjects]);

  const filteredUnits = useMemo(() => {
    return units.filter(
      (unit) =>
        unit.subjectId === form.subjectId
    );
  }, [form.subjectId, units]);

  const filteredTopics = useMemo(() => {
    return topics.filter(
      (topic) =>
        topic.unitId === form.unitId
    );
  }, [form.unitId, topics]);

  const filteredSubtopics = useMemo(() => {
    return subtopics.filter(
      (subtopic) =>
        subtopic.topicId === form.topicId
    );
  }, [form.topicId, subtopics]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      {/* Program */}

      <select
        className="w-full rounded border p-2"
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
          <option key={program.id} value={program.id}>
            {program.name}
          </option>
        ))}
      </select>

      {/* Semester */}

      <select
        className="w-full rounded border p-2"
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
          <option key={semester.id} value={semester.id}>
            {semester.name}
          </option>
        ))}
      </select>

      {/* Subject */}

      <select
        className="w-full rounded border p-2"
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
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}
      </select>

      {/* Unit */}

      <select
        className="w-full rounded border p-2"
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
          <option key={unit.id} value={unit.id}>
            {unit.title}
          </option>
        ))}
      </select>

      {/* Topic */}

      <select
        className="w-full rounded border p-2"
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
          <option key={topic.id} value={topic.id}>
            {topic.title}
          </option>
        ))}
      </select>

      {/* Subtopic */}

      <select
        className="w-full rounded border p-2"
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
          <option key={subtopic.id} value={subtopic.id}>
            {subtopic.title}
          </option>
        ))}
      </select>


      <div>
        <label className="mb-1 block font-medium">
          Title
        </label>

        <input
          className="w-full rounded border p-2"
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
        <label className="mb-1 block font-medium">
          Slug
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
      </div>


      <div>
        <label className="mb-1 block font-medium">
          Summary
        </label>

        <textarea
          rows={4}
          className="w-full rounded border p-2"
          value={form.summary}
          onChange={(e) =>
            setForm({
              ...form,
              summary: e.target.value,
            })
          }
        />
      </div>




      <div>
        <label className="mb-1 block font-medium">
          Content
        </label>

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

      <div>
        <label className="mb-1 block font-medium">
          Reading Time
        </label>

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


      <div>
        <label className="mb-1 block font-medium">
          SEO Title
        </label>

        <input
          className="w-full rounded border p-2"
          value={form.seoTitle}
          onChange={(e) =>
            setForm({
              ...form,
              seoTitle: e.target.value,
            })
          }
        />
      </div>


      <div>
        <label className="mb-1 block font-medium">
          SEO Description
        </label>

        <textarea
          rows={3}
          className="w-full rounded border p-2"
          value={form.seoDescription}
          onChange={(e) =>
            setForm({
              ...form,
              seoDescription: e.target.value,
            })
          }
        />
      </div>






      <div>
        <label className="mb-1 block font-medium">
          Status
        </label>

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


      <button
        type="submit"
        className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Save Content
      </button>

    </form>
  );
}