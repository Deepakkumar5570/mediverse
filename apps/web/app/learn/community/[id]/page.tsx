import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { LearnLayout } from "@/src/components/learn";

import {
  getCommunityCommentsAction,
  getCommunityCommentLikeCountAction,
  getCommunityCommentLikeStatusAction,
  getCommunityPostByIdAction,
  getCommunityPostLikeCountAction,
  getCommunityPostLikeStatusAction,
} from "@/src/features/community";

import {
  CommunityComments,
  CommunityPostLikeButton,
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

  const { userId } = await auth();

  const post = await getCommunityPostByIdAction(id);

  if (!post) {
    notFound();
  }

  const [comments, likeCount] =
    await Promise.all([
      getCommunityCommentsAction(id),
      getCommunityPostLikeCountAction(id),
    ]);

  const likeStatus = userId
    ? await getCommunityPostLikeStatusAction(id)
    : null;

  

  const likeData: Record<
  string,
  {
    liked: boolean;
    likeCount: number;
  }
> = {};

await Promise.all(
  comments.map(async (comment) => {
    const likeCount =
      await getCommunityCommentLikeCountAction(
        comment.id,
      );

    if (!userId) {
      likeData[comment.id] = {
        liked: false,
        likeCount,
      };

      return;
    }

    const status =
      await getCommunityCommentLikeStatusAction(
        comment.id,
      );

    likeData[comment.id] = {
      liked: status.liked,
      likeCount: status.likeCount,
    };
  }),
);

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
              {post.createdAt
                .toISOString()
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/")}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {post.title}
          </h1>

          <p className="mt-6 whitespace-pre-wrap text-sm leading-8 text-slate-600 sm:text-base">
            {post.content}
          </p>

          <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
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

            <CommunityPostLikeButton
              postId={post.id}
              initialLiked={likeStatus?.liked ?? false}
              initialLikeCount={
                likeStatus?.likeCount ?? likeCount
              }
              isAuthenticated={Boolean(userId)}
            />
          </div>
        </article>

        {/* Answer form */}
        <div className="mt-6">
          <CreateCommentForm postId={post.id} />
        </div>

        {/* Answers */}
        <div className="mt-10">
          <CommunityComments
            postId={id}
            comments={comments}
            likeData={likeData}
            isAuthenticated={Boolean(userId)}
          />
        </div>
      </div>
    </LearnLayout>
  );
}