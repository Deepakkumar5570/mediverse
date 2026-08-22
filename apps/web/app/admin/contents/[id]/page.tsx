import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import {
  deleteContentAction,
  getContentByIdWithHierarchyAction,
} from "../../../../src/features/content/actions";

import {
  DeleteContentButton,
} from "../../../../src/features/content/components";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function deleteAction(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;

  await deleteContentAction(id);

  redirect("/admin/contents");
}

export default async function ContentDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const result =
    await getContentByIdWithHierarchyAction(id);

  if (!result) {
    notFound();
  }

  const {
    content,
    subtopic,
    topic,
    unit,
    subject,
    semester,
    program,
  } = result;

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

        {/* TOP NAV */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin/contents"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            ← Back to Content
          </Link>

          <div className="flex gap-2">
            <Link
              href={`/admin/contents/${content.id}/edit`}
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              Edit
            </Link>

            <form
              id="delete-content-form"
              action={deleteAction}
            >
              <input
                type="hidden"
                name="id"
                value={content.id}
              />
            </form>

            <DeleteContentButton
              formId="delete-content-form"
            />
          </div>
        </div>

        {/* HERO */}
        <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />

          <div className="relative px-6 py-8 sm:px-10 sm:py-10">

            {/* STATUS + READING TIME */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${content.status === "active"
                  ? "bg-emerald-50 text-emerald-700"
                  : content.status === "draft"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-600"
                  }`}
              >
                ● {content.status}
              </span>

              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                📖 {content.readingTime} min read
              </span>
            </div>

            {/* CURRICULUM BREADCRUMB */}
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-lg bg-indigo-50 px-2.5 py-1.5 font-semibold text-indigo-700">
                {program.name}
              </span>

              <span className="text-slate-300">
                →
              </span>

              <span className="rounded-lg bg-violet-50 px-2.5 py-1.5 font-semibold text-violet-700">
                {semester.name}
              </span>

              <span className="text-slate-300">
                →
              </span>

              <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 font-semibold text-blue-700">
                {subject.name}
              </span>

              <span className="text-slate-300">
                →
              </span>

              <span className="rounded-lg bg-amber-50 px-2.5 py-1.5 font-semibold text-amber-700">
                {unit.title}
              </span>

              <span className="text-slate-300">
                →
              </span>

              <span className="rounded-lg bg-emerald-50 px-2.5 py-1.5 font-semibold text-emerald-700">
                {topic.title}
              </span>

              <span className="text-slate-300">
                →
              </span>

              <span className="rounded-lg bg-pink-50 px-2.5 py-1.5 font-semibold text-pink-700">
                {subtopic.title}
              </span>
            </div>

            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {content.title}
            </h1>

            <p className="mt-4 max-w-3xl font-mono text-xs text-slate-400">
              /{content.slug}
            </p>

            {content.summary && (
              <div className="mt-7 max-w-4xl rounded-2xl border border-indigo-100 bg-white/80 p-5 text-sm leading-7 text-slate-600 shadow-sm backdrop-blur">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Quick overview
                </span>

                {content.summary}
              </div>
            )}
          </div>
        </header>

        {/* ARTICLE */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">

          {/* MAIN READING AREA */}
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="px-6 py-8 sm:px-10 sm:py-10">
              <div
                className="
  max-w-none

  [&_p]:my-3
  [&_p]:leading-8
  [&_p]:text-slate-700

  [&_h1]:mt-10
  [&_h1]:mb-5
  [&_h1]:text-4xl
  [&_h1]:font-black
  [&_h1]:leading-tight
  [&_h1]:tracking-tight
  [&_h1]:text-slate-950

  [&_h2]:mt-9
  [&_h2]:mb-4
  [&_h2]:text-3xl
  [&_h2]:font-bold
  [&_h2]:leading-tight
  [&_h2]:tracking-tight
  [&_h2]:text-slate-900

  [&_h3]:mt-7
  [&_h3]:mb-3
  [&_h3]:text-2xl
  [&_h3]:font-bold
  [&_h3]:text-slate-900

  [&_ul]:my-5
  [&_ul]:list-disc
  [&_ul]:pl-7

  [&_ol]:my-5
  [&_ol]:list-decimal
  [&_ol]:pl-7

  [&_li]:my-1.5
  [&_li]:leading-7
  [&_li]:text-slate-700

  [&_blockquote]:my-6
  [&_blockquote]:rounded-r-2xl
  [&_blockquote]:border-l-4
  [&_blockquote]:border-indigo-500
  [&_blockquote]:bg-indigo-50
  [&_blockquote]:px-6
  [&_blockquote]:py-4
  [&_blockquote]:italic
  [&_blockquote]:text-slate-700

  [&_pre]:my-6
  [&_pre]:overflow-x-auto
  [&_pre]:rounded-2xl
  [&_pre]:bg-slate-950
  [&_pre]:px-5
  [&_pre]:py-4
  [&_pre]:shadow-lg

  [&_pre_code]:bg-transparent
  [&_pre_code]:p-0
  [&_pre_code]:font-mono
  [&_pre_code]:text-sm
  [&_pre_code]:text-slate-100

  [&_code]:rounded
  [&_code]:bg-slate-100
  [&_code]:px-1.5
  [&_code]:py-0.5
  [&_code]:font-mono
  [&_code]:text-sm
  [&_code]:text-slate-800

  [&_hr]:my-8
  [&_hr]:border-0
  [&_hr]:border-t
  [&_hr]:border-slate-300

  [&_a]:font-medium
  [&_a]:text-indigo-600
  [&_a]:underline
"
                dangerouslySetInnerHTML={{
                  __html: content.content,
                }}
              />
            </div>
          </article>

          {/* SIDE INFO */}
          <aside className="space-y-4">

            {/* CONTENT INFO */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Content Info
              </p>

              <div className="mt-4 space-y-4">

                <div>
                  <p className="text-xs text-slate-400">
                    Status
                  </p>

                  <p className="mt-1 text-sm font-semibold capitalize text-slate-800">
                    {content.status}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Reading time
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {content.readingTime} minutes
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Slug
                  </p>

                  <p className="mt-1 break-all font-mono text-xs text-slate-600">
                    {content.slug}
                  </p>
                </div>
              </div>
            </div>

            {/* CURRICULUM */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Curriculum
              </p>

              <div className="mt-4 space-y-3">

                <div>
                  <p className="text-[11px] text-indigo-500">
                    Program
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-slate-800">
                    {program.name}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-indigo-500">
                    Semester
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-slate-800">
                    {semester.name}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-indigo-500">
                    Subject
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-slate-800">
                    {subject.name}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-indigo-500">
                    Unit
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-slate-800">
                    {unit.title}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-indigo-500">
                    Topic
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-slate-800">
                    {topic.title}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-indigo-500">
                    Subtopic
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-slate-800">
                    {subtopic.title}
                  </p>
                </div>

              </div>
            </div>

            {/* SEO */}
            {(content.seoTitle ||
              content.seoDescription) && (
                <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                    SEO
                  </p>

                  {content.seoTitle && (
                    <div className="mt-4">
                      <p className="text-xs text-violet-500">
                        SEO Title
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {content.seoTitle}
                      </p>
                    </div>
                  )}

                  {content.seoDescription && (
                    <div className="mt-4">
                      <p className="text-xs text-violet-500">
                        Description
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {content.seoDescription}
                      </p>
                    </div>
                  )}
                </div>
              )}

          </aside>
        </div>
      </div>
    </main>
  );
}