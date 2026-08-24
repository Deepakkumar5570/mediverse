type Props = {
  content: string;
};

export function MarkdownContent({
  content,
}: Props) {
  return (
    <article
      className="
        prose prose-slate max-w-none

        prose-headings:scroll-mt-24
        prose-headings:font-bold
        prose-headings:tracking-tight
        prose-headings:text-slate-950

        prose-h1:mb-6
        prose-h1:text-3xl
        prose-h1:leading-tight
        md:prose-h1:text-4xl

        prose-h2:mt-10
        prose-h2:mb-4
        prose-h2:border-b
        prose-h2:border-slate-200
        prose-h2:pb-2
        prose-h2:text-2xl

        prose-h3:mt-8
        prose-h3:mb-3
        prose-h3:text-xl

        prose-p:my-5
        prose-p:text-[16px]
        prose-p:leading-8
        prose-p:text-slate-700

        prose-a:font-medium
        prose-a:text-violet-600
        prose-a:no-underline
        hover:prose-a:underline

        prose-strong:font-bold
        prose-strong:text-slate-900

        prose-ul:my-5
        prose-ol:my-5

        prose-li:my-2
        prose-li:leading-7
        prose-li:text-slate-700

        prose-blockquote:my-7
        prose-blockquote:border-violet-400
        prose-blockquote:bg-violet-50
        prose-blockquote:px-5
        prose-blockquote:py-3
        prose-blockquote:text-slate-700

        prose-pre:my-7
        prose-pre:overflow-x-auto
        prose-pre:rounded-2xl
        prose-pre:bg-slate-950
        prose-pre:p-5

        prose-code:text-violet-700
        prose-code:before:content-none
        prose-code:after:content-none

        prose-table:my-8
        prose-table:w-full

        prose-th:bg-slate-100
        prose-th:px-4
        prose-th:py-3
        prose-th:text-left
        prose-th:text-sm
        prose-th:font-semibold
        prose-th:text-slate-900

        prose-td:px-4
        prose-td:py-3
        prose-td:text-sm
        prose-td:text-slate-700

        prose-img:my-8
        prose-img:mx-auto
        prose-img:max-w-full
        prose-img:rounded-2xl
        prose-img:border
        prose-img:border-slate-200
        prose-img:shadow-sm

        prose-hr:my-10
        prose-hr:border-slate-200
      "
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}