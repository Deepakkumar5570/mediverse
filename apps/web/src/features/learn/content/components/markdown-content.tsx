type Props = {
  content: string;
};

export function MarkdownContent({
  content,
}: Props) {
  return (
    <article className="prose prose-neutral max-w-none">
      <pre className="whitespace-pre-wrap break-words">
        {content}
      </pre>
    </article>
  );
}