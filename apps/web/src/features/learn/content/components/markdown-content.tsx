type Props = {
  content: string;
};

export function MarkdownContent({
  content,
}: Props) {
  return (
    <article
      className="prose prose-neutral max-w-none
        prose-headings:scroll-mt-24
        prose-p:leading-7
        prose-a:font-medium
        prose-strong:font-semibold
        prose-ul:my-4
        prose-ol:my-4
        prose-blockquote:my-6
        prose-pre:my-6"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}