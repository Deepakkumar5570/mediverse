import Link from "next/link";

const adminSections = [
  {
    title: "Content",
    description:
      "Create, edit and manage educational lessons and learning material.",
    href: "/admin/contents",
    icon: "📚",
  },
  {
    title: "MCQs",
    description:
      "Manage multiple-choice questions and practice content.",
    href: "/admin/mcqs",
    icon: "📝",
  },
  {
    title: "Programs",
    description:
      "Manage academic programs available on MediVerse.",
    href: "/admin/programs",
    icon: "🎓",
  },
  {
    title: "Semesters",
    description:
      "Organize curriculum content by semester.",
    href: "/admin/semesters",
    icon: "📅",
  },
  {
    title: "Subjects",
    description:
      "Create and manage subjects inside academic programs.",
    href: "/admin/subjects",
    icon: "📖",
  },
  {
    title: "Units",
    description:
      "Manage units that belong to each subject.",
    href: "/admin/units",
    icon: "🗂️",
  },
  {
    title: "Topics",
    description:
      "Manage topics inside individual units.",
    href: "/admin/topics",
    icon: "📌",
  },
  {
    title: "Subtopics",
    description:
      "Manage detailed subtopics inside each topic.",
    href: "/admin/subtopics",
    icon: "🔖",
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  Admin Panel
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  MediVerse Administration
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Manage MediVerse curriculum, educational content,
                  MCQs and learning resources from one place.
                </p>
              </div>

              <Link
                href="/learn"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Back to Learning
              </Link>
            </div>
          </div>
        </section>

        {/* Quick overview */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Curriculum
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              Programs → Subjects
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Organize the academic structure.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Learning
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              Units → Topics
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Build structured learning paths.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Content
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              Lessons
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Create and publish educational material.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Practice
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              MCQs
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Manage question-based practice.
            </p>
          </div>
        </section>

        {/* Management sections */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-950">
              Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose an area to manage your MediVerse data.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {adminSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                    {section.icon}
                  </div>

                  <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500">
                    →
                  </span>
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {section.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {section.description}
                </p>

                <div className="mt-5 text-sm font-semibold text-indigo-600">
                  Manage {section.title}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}