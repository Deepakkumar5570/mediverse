import Link from "next/link";

import {
  getContentStatsAction,
  getContentsByStatusAction,
  getPaginatedContentsAction,
  searchContentsAction,
} from "@/src/features/content/actions";

type Props = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    status?: "draft" | "active" | "archived";
  }>;
};

export default async function ContentsPage({
  searchParams,
}: Props) {
  const {
    search = "",
    page = "1",
    status,
  } = await searchParams;

  const currentPage = Math.max(Number(page) || 1, 1);

  const [pagination, stats] = await Promise.all([
    getPaginatedContentsAction(
      currentPage,
      10
    ),
    getContentStatsAction(),
  ]);

  let contents = pagination.items;

  if (search.trim()) {
    contents = await searchContentsAction(
      search.trim(),
      status
    );
  } else if (status) {
    contents = await getContentsByStatusAction(
      status
    );
  }

  const isSearching = search.trim().length > 0;

  const totalPages = pagination.totalPages;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  function buildUrl(nextPage?: number) {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (status) {
      params.set("status", status);
    }

    if (nextPage && nextPage > 1) {
      params.set("page", String(nextPage));
    }

    const query = params.toString();

    return query
      ? `/admin/contents?${query}`
      : "/admin/contents";
  }

  const activeCount = stats.active;
  const draftCount = stats.draft;
  const archivedCount = stats.archived;

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div className="mx-auto w-full max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">

        {/* HEADER */}
        <header className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />

          <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                MediVerse CMS
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Content Library
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Create, manage and publish educational content
                across your MediVerse curriculum.
              </p>
            </div>

            <Link
              href="/admin/contents/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-indigo-600"
            >
              <span className="text-lg leading-none">+</span>
              New Content
            </Link>
          </div>
        </header>

        {/* STATS */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Total
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stats.total}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                📚
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Educational resources
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  Active
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-900">
                  {activeCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                ✓
              </div>
            </div>

            <p className="mt-3 text-xs text-emerald-700/70">
              Published content
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                  Drafts
                </p>

                <p className="mt-2 text-3xl font-bold text-amber-900">
                  {draftCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                ✎
              </div>
            </div>

            <p className="mt-3 text-xs text-amber-700/70">
              Still in progress
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Archived
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {archivedCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                ▫
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Hidden from active use
            </p>
          </div>
        </section>

        {/* FILTER BAR */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-sm font-semibold text-slate-900">
              Find content
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Search by title or slug and filter by publishing status.
            </p>
          </div>

          <form
            action="/admin/contents"
            method="get"
            className="flex flex-col gap-3 lg:flex-row"
          >
            {status && (
              <input
                type="hidden"
                name="status"
                value={status}
              />
            )}

            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>

              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search title or slug..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            <button
              type="submit"
              className="h-11 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              Search
            </button>

            {search && (
              <Link
                href={
                  status
                    ? `/admin/contents?status=${status}`
                    : "/admin/contents"
                }
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-6 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Clear
              </Link>
            )}
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/admin/contents"
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                !status
                  ? "bg-slate-950 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              All
            </Link>

            <Link
              href="/admin/contents?status=active"
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                status === "active"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-emerald-50"
              }`}
            >
              Active
            </Link>

            <Link
              href="/admin/contents?status=draft"
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                status === "draft"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-amber-50"
              }`}
            >
              Draft
            </Link>

            <Link
              href="/admin/contents?status=archived"
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                status === "archived"
                  ? "bg-slate-700 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Archived
            </Link>
          </div>
        </section>

        {/* SEARCH RESULT */}
        {isSearching && (
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3">
            <p className="text-sm text-indigo-700">
              Found{" "}
              <strong>{contents.length}</strong>{" "}
              result{contents.length !== 1 ? "s" : ""} for{" "}
              <strong>“{search.trim()}”</strong>
            </p>
          </div>
        )}

        {/* CONTENT TABLE */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                All Content
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {contents.length} item
                {contents.length !== 1 ? "s" : ""} displayed
              </p>
            </div>

            <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
              Page {currentPage} of {totalPages || 1}
            </div>
          </div>

          {contents.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                📄
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                No content found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                {status
                  ? `No ${status} content is available.`
                  : isSearching
                    ? `Nothing matches "${search.trim()}".`
                    : "Start building the MediVerse knowledge base by creating your first content item."}
              </p>

              {!search && !status && (
                <Link
                  href="/admin/contents/new"
                  className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                >
                  Create Content
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80">
                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Content
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Slug
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Reading
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {contents.map((content) => (
                    <tr
                      key={content.id}
                      className="group border-b border-slate-100 last:border-0 transition hover:bg-indigo-50/30"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm">
                            📖
                          </div>

                          <div className="min-w-0 max-w-[360px]">
                            <Link
                              href={`/admin/contents/${content.id}`}
                              className="block truncate font-semibold text-slate-900 transition group-hover:text-indigo-600"
                            >
                              {content.title}
                            </Link>

                            {content.summary && (
                              <p className="mt-1 truncate text-xs text-slate-500">
                                {content.summary}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex max-w-[220px] truncate rounded-lg bg-slate-100 px-2.5 py-1.5 font-mono text-[11px] text-slate-500">
                          {content.slug}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-lg bg-violet-50 px-2.5 py-1.5 text-xs font-semibold text-violet-700">
                          {content.readingTime} min
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            content.status === "active"
                              ? "bg-emerald-50 text-emerald-700"
                              : content.status === "draft"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {content.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/contents/${content.id}`}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                          >
                            View
                          </Link>

                          <Link
                            href={`/admin/contents/${content.id}/edit`}
                            className="rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-600"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* PAGINATION */}
        {!isSearching && totalPages > 1 && (
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <Link
              href={buildUrl(currentPage - 1)}
              aria-disabled={!hasPrevious}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                hasPrevious
                  ? "border-slate-200 text-slate-600 hover:bg-slate-50"
                  : "pointer-events-none border-slate-100 text-slate-300"
              }`}
            >
              ← Previous
            </Link>

            <span className="text-sm text-slate-500">
              Page{" "}
              <strong className="text-slate-900">
                {currentPage}
              </strong>{" "}
              of{" "}
              <strong className="text-slate-900">
                {totalPages}
              </strong>
            </span>

            <Link
              href={buildUrl(currentPage + 1)}
              aria-disabled={!hasNext}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                hasNext
                  ? "border-slate-200 text-slate-600 hover:bg-slate-50"
                  : "pointer-events-none border-slate-100 text-slate-300"
              }`}
            >
              Next →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}