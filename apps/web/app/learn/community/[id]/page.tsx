import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { LearnLayout } from "@/src/components/learn";

import {
  getCommunityCommentsAction,
  getCommunityPostByIdAction,
  getCommunityPostLikeCountAction,
  getCommunityPostLikeStatusAction,
  getCommunityCommentLikeCountAction,
  getCommunityCommentLikeStatusAction,
  getCommunityAuthors,
} from "@/src/features/community";

import {
  CommunityComments,
  CommunityPostLikeButton,
  CommunityPostOwnerActions,
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

  const post =
    await getCommunityPostByIdAction(id);

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

  /*
   * Collect all author IDs appearing on this discussion.
   */
  const authorIds = [
    post.authorId,
    ...comments.map(
      (comment) => comment.authorId,
    ),
  ];

  /*
   * Resolve author identity from Clerk.
   */
  const authors =
    await getCommunityAuthors(authorIds);

  /*
   * Resolve answer like information.
   */
  const commentLikeEntries =
    await Promise.all(
      comments.map(async (comment) => {
        const [likeCount, likeStatus] =
          await Promise.all([
            getCommunityCommentLikeCountAction(
              comment.id,
            ),
            userId
              ? getCommunityCommentLikeStatusAction(
                comment.id,
              )
              : Promise.resolve(null),
          ]);

        return [
          comment.id,
          {
            liked: likeStatus?.liked ?? false,
            likeCount:
              likeStatus?.likeCount ?? likeCount,
          },
        ] as const;
      }),
    );

  const likeData = Object.fromEntries(
    commentLikeEntries,
  );

  const postAuthor =
    authors[post.authorId];

  const isPostOwner =
    userId === post.authorId;

  return (
    <LearnLayout>
      <div className="mx-auto w-full max-w-4xl">
        {/* Back */}
        <Link
          href="/learn/community"
          className="inline-flex items-center text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
        >
          ← Back to Community
        </Link>

        {/* Post */}
        <article className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          {/* Category + Date */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700">
              {post.category}
            </span>

            <span className="text-xs text-slate-400">
              {post.createdAt
                .toISOString()
                .slice(0, 10)}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-5 text-2xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {post.title}
          </h1>

          <Link
            href={`/learn/community/profile/${post.authorId}`}
            className="mt-6 flex items-center gap-3 group"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-sm font-black text-indigo-700 transition group-hover:ring-2 group-hover:ring-indigo-200 group-hover:ring-offset-2">
              {postAuthor?.imageUrl ? (
                <img
                  src={postAuthor.imageUrl}
                  alt={postAuthor.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                (
                  postAuthor?.name?.[0] ??
                  "M"
                ).toUpperCase()
              )}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 transition group-hover:text-indigo-600">
                {postAuthor?.name ??
                  "MediVerse Member"}
              </p>

              <p className="text-xs text-slate-400">
                MediVerse contributor
              </p>
            </div>
          </Link>

          {/* Post Actions */}
          <div className="mt-7 border-t border-slate-100 pt-6">
            <div className="flex flex-wrap items-center gap-2">
              {/* Like */}
              <CommunityPostLikeButton
                postId={post.id}
                initialLiked={
                  likeStatus?.liked ?? false
                }
                initialLikeCount={
                  likeStatus?.likeCount ?? likeCount
                }
                isAuthenticated={Boolean(
                  userId,
                )}
              />

              {/* Owner Actions */}
              {isPostOwner && (
                <CommunityPostOwnerActions
                  postId={post.id}
                  initialTitle={post.title}
                  initialContent={post.content}
                  initialCategory={post.category}
                />
              )}
            </div>
          </div>
        </article>

        {/* Answers */}
        <div className="mt-10">
          <CommunityComments
            postId={id}
            comments={comments}
            likeData={likeData}
            authors={authors}
            isAuthenticated={Boolean(
              userId,
            )}
            currentUserId={userId}
          />
        </div>

        {/* Answer Form */}
        <div className="mt-10">
          <CreateCommentForm postId={id} />
        </div>
      </div>
    </LearnLayout>
  );
}