type Props = {
  content: string;
};

export function MarkdownContent({ content }: Props) {
  return (
    <article className="max-w-none">
      <div
        className="
          max-w-none

          /* Headings */
          [&_h1]:mb-6
          [&_h1]:text-4xl
          [&_h1]:font-bold
          [&_h1]:leading-tight
          [&_h1]:text-slate-950

          [&_h2]:mb-4
          [&_h2]:mt-10
          [&_h2]:border-b
          [&_h2]:border-slate-200
          [&_h2]:pb-2
          [&_h2]:text-2xl
          [&_h2]:font-bold
          [&_h2]:text-slate-950

          [&_h3]:mb-3
          [&_h3]:mt-8
          [&_h3]:text-xl
          [&_h3]:font-bold
          [&_h3]:leading-tight
          [&_h3]:text-slate-900

          /* Paragraphs */
          [&_p]:my-5
          [&_p]:text-base
          [&_p]:leading-8
          [&_p]:text-slate-700

          /* Lists */
          [&_ul]:my-5
          [&_ul]:list-disc
          [&_ul]:pl-6

          [&_ol]:my-5
          [&_ol]:list-decimal
          [&_ol]:pl-6

          [&_li]:my-2
          [&_li]:leading-7
          [&_li]:text-slate-700

          /* Text */
          [&_strong]:font-bold
          [&_strong]:text-slate-950

          /* Blockquote */
          [&_blockquote]:my-7
          [&_blockquote]:border-l-4
          [&_blockquote]:border-violet-400
          [&_blockquote]:bg-violet-50
          [&_blockquote]:px-5
          [&_blockquote]:py-3

          /* Links */
          [&_a]:font-medium
          [&_a]:text-violet-600
          [&_a]:underline

          /* Horizontal rule */
          [&_hr]:my-10
          [&_hr]:border-slate-200

          /* Tables */
          [&_table]:my-8
          [&_table]:min-w-[640px]
          [&_table]:w-full
          [&_table]:border-collapse
          [&_table]:text-sm

          [&_th]:border
          [&_th]:border-slate-300
          [&_th]:bg-slate-100
          [&_th]:px-4
          [&_th]:py-3
          [&_th]:text-left
          [&_th]:font-bold
          [&_th]:text-slate-900

          [&_td]:border
          [&_td]:border-slate-300
          [&_td]:px-4
          [&_td]:py-3
          [&_td]:align-top
          [&_td]:text-slate-700

          [&_tbody_tr:nth-child(even)]:bg-slate-50/60

          /* Images */
          [&_img]:my-8
          [&_img]:max-w-full
          [&_img]:rounded-xl
          [&_img]:border
          [&_img]:border-slate-200
          [&_img]:object-contain

          /* Callout container */
          [&_.mediverse-callout]:my-8
          [&_.mediverse-callout]:rounded-xl
          [&_.mediverse-callout]:border
          [&_.mediverse-callout]:px-6
          [&_.mediverse-callout]:py-5

          /* Note */
          [&_.mediverse-callout[data-callout='note']]:border-blue-200
          [&_.mediverse-callout[data-callout='note']]:bg-blue-50

          /* Important */
          [&_.mediverse-callout[data-callout='important']]:border-violet-200
          [&_.mediverse-callout[data-callout='important']]:bg-violet-50

          /* Warning */
          [&_.mediverse-callout[data-callout='warning']]:border-amber-200
          [&_.mediverse-callout[data-callout='warning']]:bg-amber-50

          /* Tip */
          [&_.mediverse-callout[data-callout='tip']]:border-emerald-200
          [&_.mediverse-callout[data-callout='tip']]:bg-emerald-50

          /* Callout label */
          [&_.mediverse-callout::before]:block
          [&_.mediverse-callout::before]:mb-2
          [&_.mediverse-callout::before]:text-xs
          [&_.mediverse-callout::before]:font-bold
          [&_.mediverse-callout::before]:uppercase
          [&_.mediverse-callout::before]:tracking-wider

          [&_.mediverse-callout[data-callout='note']::before]:text-blue-700
          [&_.mediverse-callout[data-callout='note']::before]:content-['Note']

          [&_.mediverse-callout[data-callout='important']::before]:text-violet-700
          [&_.mediverse-callout[data-callout='important']::before]:content-['Important']

          [&_.mediverse-callout[data-callout='warning']::before]:text-amber-700
          [&_.mediverse-callout[data-callout='warning']::before]:content-['Warning']

          [&_.mediverse-callout[data-callout='tip']::before]:text-emerald-700
          [&_.mediverse-callout[data-callout='tip']::before]:content-['Tip']

          /* Callout content */
          [&_.mediverse-callout_p]:my-1
          [&_.mediverse-callout_p]:leading-7
          [&_.mediverse-callout_p]:text-slate-700

          [&_.mediverse-callout_ul]:my-3
          [&_.mediverse-callout_ul]:pl-6

          [&_.mediverse-callout_ol]:my-3
          [&_.mediverse-callout_ol]:pl-6

          [&_.mediverse-callout_li]:my-1
        "
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
}