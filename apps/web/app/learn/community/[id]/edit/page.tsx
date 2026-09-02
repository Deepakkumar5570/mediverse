import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { LearnLayout } from "@/src/components/learn";
import { getCommunityPostByIdAction } from "@/src/features/community";
import { EditCommunityPostForm } from "@/src/features/community/components";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCommunityPostPage({
  params,
}: Props) {
  const { id } = await params;

  const { userId } = await auth();

  if (!userId) {
    redirect("/learn/community");
  }

  const post =
    await getCommunityPostByIdAction(id);

  if (!post) {
    notFound();
  }

  if (post.authorId !== userId) {
    redirect(`/learn/community/${id}`);
  }

  return (
    <LearnLayout>
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href={`/learn/community/${id}`}
          className="inline-flex items-center text-sm font-semibold text-slate-500 transition hover:text-slate-950"
        >
          ← Back to Post
        </Link>

        <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-6 sm:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              MediVerse Community
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Edit your post
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Update your question, knowledge or
              discussion and keep it useful for the
              community.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <EditCommunityPostForm
              postId={post.id}
              initialData={{
                title: post.title,
                content: post.content,
                category: post.category,
              }}
            />
          </div>
        </div>
      </div>
    </LearnLayout>
  );
}