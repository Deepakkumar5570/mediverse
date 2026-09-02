import Link from "next/link";
import { notFound } from "next/navigation";

import { LearnLayout } from "@/src/components/learn";
import {
  getCommunityCommentsAction,
  getCommunityPostByIdAction,
} from "@/src/features/community";

import {
  CommunityComments,
  CreateCommentForm,
} from "@/src/features/community/components";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CommunityPostPage({
  params,
}: Props) {
  const { id } = await params;

  const post = await getCommunityPostByIdAction(id);

  if (!post) {
    notFound();
  }

  const comments =
    await getCommunityCommentsAction(id);

  return (
    <LearnLayout>
      <div className="mx-auto w-full max-w-4xl">
        <Link
          href="/learn/community"
          className="inline-flex items-center text-sm font-semibold text-slate-500 transition hover:text-slate-950"
        >
          ← Back to Community
        </Link>

        {/* Post */}
        <article className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-[11px] font-bold capitalize text-indigo-700">
              {post.category}
            </span>

            <span className="text-xs text-slate-400">
              {post.createdAt.toLocaleDateString()}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {post.title}
          </h1>

          <p className="mt-6 whitespace-pre-wrap text-sm leading-8 text-slate-600 sm:text-base">
            {post.content}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-black text-indigo-700">
              U
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                Community Member
              </p>

              <p className="text-xs text-slate-400">
                MediVerse contributor
              </p>
            </div>
          </div>
        </article>

        {/* Answer form */}
        <div className="mt-6">
          <CreateCommentForm postId={post.id} />
        </div>

        {/* Answers */}
        <div className="mt-10">
          <CommunityComments comments={comments} />
        </div>
      </div>
    </LearnLayout>
  );
}