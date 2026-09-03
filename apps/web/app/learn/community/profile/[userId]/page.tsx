import Link from "next/link";
import { notFound } from "next/navigation";

import { LearnLayout } from "@/src/components/learn";

import {
  getCommunityAuthors,
} from "@/src/features/community";

import {
  getCommunityPostsByAuthorService,
  getCommunityCommentsByAuthorService,
} from "@/src/features/community/services";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "M"
  );
}

export default async function CommunityProfilePage({
  params,
}: Props) {
  const { userId } = await params;

  if (!userId?.trim()) {
    notFound();
  }

  const [posts, answers] =
    await Promise.all([
      getCommunityPostsByAuthorService(userId),
      getCommunityCommentsByAuthorService(userId),
    ]);

  const authors =
    await getCommunityAuthors([userId]);

  const author = authors[userId];

  if (!author) {
    notFound();
  }

  return (
    <LearnLayout>
      <div className="mx-auto w-full max-w-5xl">
        {/* Back */}
        <Link
          href="/learn/community"
          className="inline-flex items-center text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
        >
          ← Back to Community
        </Link>

        {/* Profile Hero */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="h-28 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 sm:h-36" />

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            {/* Identity */}
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 items-end gap-4">
                {/* Avatar */}
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-indigo-100 text-2xl font-black text-indigo-700 shadow-md sm:h-28 sm:w-28 sm:text-3xl">
                  {author.imageUrl ? (
                    <img
                      src={author.imageUrl}
                      alt={author.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitials(author.name)
                  )}
                </div>

                <div className="min-w-0 pb-1">
                  <h1 className="truncate text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    {author.name}
                  </h1>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    MediVerse Member
                  </p>
                </div>
              </div>

              {/* Member badge */}
              <div className="hidden rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700 sm:inline-flex">
                Community Contributor
              </div>
            </div>

            {/* Stats */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:max-w-md sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                <p className="text-xl font-black text-slate-950">
                  {posts.length}
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Posts
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                <p className="text-xl font-black text-slate-950">
                  {answers.length}
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Answers
                </p>
              </div>

              <div className="col-span-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 sm:col-span-1">
                <p className="text-xl font-black text-slate-950">
                  {posts.length + answers.length}
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Activities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Posts */}
        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Community
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              Community Posts
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Questions and discussions shared by this member.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
                📝
              </div>

              <h3 className="mt-4 text-lg font-black text-slate-950">
                No posts yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                This member has not shared any community
                posts yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/learn/community/${post.id}`}
                  className="group block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-indigo-700">
                      {post.category}
                    </span>

                    <span className="text-xs text-slate-400">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-black leading-7 text-slate-950 transition group-hover:text-indigo-700 sm:text-xl">
                    {post.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-7 text-slate-500">
                    {post.content}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold text-slate-400">
                      View discussion
                    </span>

                    <span className="text-sm font-black text-indigo-600 transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Recent Answers */}
        <section className="mt-12">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Contributions
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              Recent Answers
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Helpful answers shared across the community.
            </p>
          </div>

          {answers.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
                💬
              </div>

              <h3 className="mt-4 text-lg font-black text-slate-950">
                No answers yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                This member has not answered any community
                questions yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {answers.map((answer) => (
                <Link
                  key={answer.id}
                  href={`/learn/community/${answer.postId}`}
                  className="group block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-indigo-600">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50">
                        💬
                      </span>

                      Answer
                    </span>

                    <span className="shrink-0 text-xs text-slate-400">
                      {formatDate(answer.createdAt)}
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-4 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                    {answer.content}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold text-slate-400">
                      View question & discussion
                    </span>

                    <span className="text-sm font-black text-indigo-600 transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Bottom spacing */}
        <div className="h-8" />
      </div>
    </LearnLayout>
  );
}