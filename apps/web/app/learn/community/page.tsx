import Link from "next/link";

import { LearnLayout } from "@/src/components/learn";
import {
  getCommunityAuthors,
  getCommunityPostsAction,
} from "@/src/features/community";

export default async function CommunityPage() {
  const posts = await getCommunityPostsAction();

  const authorIds = posts.map(
    (post) => post.authorId,
  );

  const authors =
    await getCommunityAuthors(authorIds);

  return (
    <LearnLayout>
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                MediVerse Community
              </div>

              {/* Heading */}
              <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                Learn together.
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  Share what you know.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Ask questions, share useful knowledge and learn from other
                students and contributors across MediVerse.
              </p>
            </div>

            {/* Create post */}
            <div className="shrink-0">
              <Link
                href="/learn/community/create"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
              >
                + Create Post
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <span className="text-lg">💬</span>

              <div>
                <p className="text-sm font-black text-slate-950">
                  {posts.length}
                </p>

                <p className="text-[11px] font-medium text-slate-500">
                  Published posts
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <span className="text-lg">🤝</span>

              <div>
                <p className="text-sm font-black text-slate-950">
                  Student-first
                </p>

                <p className="text-[11px] font-medium text-slate-500">
                  Learn from the community
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <span className="text-lg">📚</span>

              <div>
                <p className="text-sm font-black text-slate-950">
                  Knowledge
                </p>

                <p className="text-[11px] font-medium text-slate-500">
                  Share and discover
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          COMMUNITY FEED
      ===================================================== */}
      <section className="mt-12">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Community feed
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              What the community is sharing.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Explore questions, explanations, study tips and useful knowledge
              shared by the MediVerse community.
            </p>
          </div>

          {posts.length > 0 && (
            <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
              {posts.length}{" "}
              {posts.length === 1 ? "post" : "posts"}
            </div>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
              💬
            </div>

            <h2 className="mt-5 text-xl font-black text-slate-950">
              No community posts yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Be the first to share something useful with the MediVerse
              community.
            </p>

            <Link
              href="/learn/community/create"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              Create the first post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const author = authors[post.authorId];

              return (
                <Link
                  key={post.id}
                  href={`/learn/community/${post.id}`}
                  className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-7"
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold capitalize text-indigo-700">
                            {post.category}
                          </span>

                          <span className="text-xs text-slate-400">
                            {post.createdAt
                              .toISOString()
                              .slice(0, 10)}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950 transition group-hover:text-indigo-700">
                          {post.title}
                        </h3>
                      </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-sm font-black text-indigo-700">
                        {author?.imageUrl ? (
                          <img
                            src={author.imageUrl}
                            alt={author.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          (
                            author?.name?.[0] ?? "M"
                          ).toUpperCase()
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {author?.name ??
                            "MediVerse Member"}
                        </p>

                        <p className="text-xs text-slate-400">
                          MediVerse contributor
                        </p>
                      </div>
                    </div>

                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                      {post.content}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs font-semibold text-slate-400">
                        View discussion
                      </span>

                      <span className="text-sm font-bold text-indigo-600 transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section className="mt-14 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
              Build the community
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Have something useful to share?
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Share your knowledge and help another student learn something
              new.
            </p>
          </div>

          <Link
            href="/learn/community/create"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
          >
            Create a Post
          </Link>
        </div>
      </section>
    </LearnLayout>
  );
}