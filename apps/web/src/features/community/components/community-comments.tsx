type Comment = {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
};

type Props = {
  comments: Comment[];
};

export function CommunityComments({
  comments,
}: Props) {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
            Community answers
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
            {comments.length}{" "}
            {comments.length === 1
              ? "Answer"
              : "Answers"}
          </h2>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
            💬
          </div>

          <h3 className="mt-4 text-lg font-black text-slate-950">
            No answers yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Be the first person to help answer this
            question.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-black text-indigo-700">
                  U
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      Community Member
                    </span>

                    <span className="text-xs text-slate-400">
                      {comment.createdAt.toLocaleDateString()}
                    </span>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                    {comment.content}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}