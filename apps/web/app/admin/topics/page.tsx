import Link from "next/link";

import { getTopicsAction } from "@/src/features/topic/actions";

export default async function TopicsPage() {
  const topics = await getTopicsAction();

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Topics
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage topics across your MediVerse academic content.
          </p>
        </div>

        <Link
          href="/admin/topics/new"
          className="inline-flex w-fit items-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          + Add Topic
        </Link>
      </section>

      {/* Topic List */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Section Header */}
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="font-semibold text-slate-900">
            All Topics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {topics.length}{" "}
            {topics.length === 1 ? "topic" : "topics"} available
          </p>
        </div>

        {/* Empty State */}
        {topics.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl">
              📝
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No topics found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create a topic to start organizing learning content.
            </p>

            <Link
              href="/admin/topics/new"
              className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              + Create Topic
            </Link>
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Topic
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Topic No.
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Slug
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {topics.map((topic) => (
                  <tr
                    key={topic.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >
                    {/* Topic */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                          📖
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900">
                            {topic.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Learning topic
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Number */}
                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                        Topic {topic.topicNumber}
                      </span>
                    </td>

                    {/* Slug */}
                    <td className="px-6 py-5">
                      <code className="rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600">
                        {topic.slug}
                      </code>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={
                          topic.status === "active"
                            ? "inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                            : "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                        }
                      >
                        {topic.status === "active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/admin/topics/${topic.id}/edit`}
                        className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}