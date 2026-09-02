import Link from "next/link";

import { CreatePostForm } from "@/src/features/community/components";

export default function CreateCommunityPostPage() {
  return (
    <main className="min-h-screen bg-slate-50/70">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Back */}
        <Link
          href="/learn/community"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
        >
          <span aria-hidden="true">←</span>
          Back to Community
        </Link>

        {/* Header */}
        <div className="mt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            MediVerse Community
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Create a post
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Share a question, useful knowledge, study tip, or something
            interesting with the MediVerse community.
          </p>
        </div>

        {/* Form */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <CreatePostForm />
        </section>

        {/* Guidelines */}
        <section className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
          <h2 className="text-sm font-black text-slate-900">
            Community guidelines
          </h2>

          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>• Share useful and relevant information.</li>
            <li>• Keep questions and discussions respectful.</li>
            <li>• Avoid misleading or harmful information.</li>
            <li>• Help other students learn and grow.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}