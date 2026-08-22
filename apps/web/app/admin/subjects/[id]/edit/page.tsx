import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getProgramsAction,
} from "@/src/features/program/actions";

import {
  getSemestersAction,
} from "@/src/features/semester/actions";

import {
  getSubjectByIdService,
} from "@/src/features/subject/services";

import { SubjectForm } from "@/src/features/subject/components/subject-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditSubjectPage({
  params,
}: Props) {
  const { id } = await params;

  const [
    subject,
    programs,
    semesters,
  ] = await Promise.all([
    getSubjectByIdService(id),
    getProgramsAction(),
    getSemestersAction(),
  ]);

  if (!subject) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-8">
      <div>
        <Link
          href="/admin/subjects"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Back to Subjects
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
          Edit Subject
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Update this MediVerse academic subject.
        </p>
      </div>

      <SubjectForm
        programs={programs}
        semesters={semesters}
        initialData={{
          id: subject.id,
          semesterId: subject.semesterId,
          name: subject.name,
          slug: subject.slug,
          code: subject.code,
          description: subject.description,
          semester: subject.semester,
          status:
            subject.status === "active"
              ? "active"
              : "inactive",
        }}
      />
    </main>
  );
}