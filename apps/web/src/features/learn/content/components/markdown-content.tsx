type Props = {
  content: string;
};

export function MarkdownContent({ content }: Props) {
  return (
    <div className="max-w-none">
      <div
        className="
          max-w-none

          /* Headings */
          [&_h1]:mb-6
          [&_h1]:mt-0
          [&_h1]:text-3xl
          [&_h1]:font-bold
          [&_h1]:leading-tight
          [&_h1]:text-slate-950

          [&_h2]:mb-4
          [&_h2]:mt-12
          [&_h2]:border-b
          [&_h2]:border-slate-200
          [&_h2]:pb-2
          [&_h2]:text-2xl
          [&_h2]:font-bold
          [&_h2]:leading-tight
          [&_h2]:text-slate-950

          [&_h3]:mb-3
          [&_h3]:mt-8
          [&_h3]:text-xl
          [&_h3]:font-bold
          [&_h3]:leading-tight
          [&_h3]:text-slate-900

          /* Paragraphs */
          [&_p]:my-5
          [&_p]:max-w-3xl
          [&_p]:text-base
          [&_p]:leading-8
          [&_p]:text-slate-700
          md:[&_p]:text-[17px]

          /* Lists */
          [&_ul]:my-5
          [&_ul]:max-w-3xl
          [&_ul]:list-disc
          [&_ul]:pl-6

          [&_ol]:my-5
          [&_ol]:max-w-3xl
          [&_ol]:list-decimal
          [&_ol]:pl-6

          [&_li]:my-2
          [&_li]:leading-7
          [&_li]:text-slate-700

          /* Text */
          [&_strong]:font-bold
          [&_strong]:text-slate-950

          [&_em]:italic

          [&_u]:underline
          [&_u]:decoration-2
          [&_u]:underline-offset-2

          /* Highlight */
          [&_mark]:rounded
          [&_mark]:bg-yellow-200
          [&_mark]:px-1
          [&_mark]:text-slate-900

          /* Superscript */
          [&_sup]:text-[0.7em]
          [&_sup]:leading-none
          [&_sup]:align-super

          /* Subscript */
          [&_sub]:text-[0.7em]
          [&_sub]:leading-none
          [&_sub]:align-sub

          /* Inline code */
          [&_code]:rounded
          [&_code]:bg-slate-100
          [&_code]:px-1.5
          [&_code]:py-0.5
          [&_code]:font-mono
          [&_code]:text-sm
          [&_code]:text-slate-800

          /* Code block */
          [&_pre]:my-7
          [&_pre]:max-w-4xl
          [&_pre]:overflow-x-auto
          [&_pre]:rounded-xl
          [&_pre]:bg-slate-950
          [&_pre]:px-5
          [&_pre]:py-4
          [&_pre]:font-mono
          [&_pre]:text-sm
          [&_pre]:leading-7
          [&_pre]:text-slate-100

          [&_pre_code]:bg-transparent
          [&_pre_code]:p-0
          [&_pre_code]:font-mono
          [&_pre_code]:text-sm
          [&_pre_code]:text-slate-100

          /* Blockquote */
          [&_blockquote]:my-7
          [&_blockquote]:max-w-3xl
          [&_blockquote]:rounded-r-xl
          [&_blockquote]:border-l-4
          [&_blockquote]:border-violet-400
          [&_blockquote]:bg-violet-50
          [&_blockquote]:px-5
          [&_blockquote]:py-4
          [&_blockquote]:text-slate-700

          [&_blockquote_p]:my-1
          [&_blockquote_p]:leading-7

          /* Links */
          [&_a]:font-medium
          [&_a]:text-violet-600
          [&_a]:underline
          [&_a]:underline-offset-2
          [&_a]:decoration-1
          [&_a]:transition-colors
          [&_a:hover]:text-violet-800

          /* Horizontal rule */
          [&_hr]:my-10
          [&_hr]:border-0
          [&_hr]:border-t
          [&_hr]:border-slate-200

          /* Tables */
          [&_table]:my-8
          [&_table]:block
          [&_table]:max-w-full
          [&_table]:overflow-x-auto
          [&_table]:border-collapse
          [&_table]:text-sm

          [&_thead]:w-full

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
          [&_img]:h-auto
          [&_img]:max-w-full
          [&_img]:rounded-xl
          [&_img]:border
          [&_img]:border-slate-200
          [&_img]:object-contain

          /* Callout container */
          [&_.mediverse-callout]:my-8
          [&_.mediverse-callout]:max-w-3xl
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
          [&_.mediverse-callout::before]:mb-2
          [&_.mediverse-callout::before]:block
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

          /* Callout headings */
          [&_.mediverse-callout_h1]:my-3
          [&_.mediverse-callout_h1]:text-2xl
          [&_.mediverse-callout_h1]:font-bold

          [&_.mediverse-callout_h2]:my-3
          [&_.mediverse-callout_h2]:text-xl
          [&_.mediverse-callout_h2]:font-bold

          [&_.mediverse-callout_h3]:my-2
          [&_.mediverse-callout_h3]:text-lg
          [&_.mediverse-callout_h3]:font-bold

          /* Callout content */
          [&_.mediverse-callout_p]:my-1
          [&_.mediverse-callout_p]:leading-7
          [&_.mediverse-callout_p]:text-slate-700

          [&_.mediverse-callout_strong]:font-bold
          [&_.mediverse-callout_em]:italic
          [&_.mediverse-callout_u]:underline

          [&_.mediverse-callout_mark]:rounded
          [&_.mediverse-callout_mark]:bg-yellow-200
          [&_.mediverse-callout_mark]:px-1

          [&_.mediverse-callout_ul]:my-3
          [&_.mediverse-callout_ul]:pl-6

          [&_.mediverse-callout_ol]:my-3
          [&_.mediverse-callout_ol]:pl-6

          [&_.mediverse-callout_li]:my-1

          [&_.mediverse-callout_a]:font-medium
          [&_.mediverse-callout_a]:text-violet-600
          [&_.mediverse-callout_a]:underline
        "
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  );
}