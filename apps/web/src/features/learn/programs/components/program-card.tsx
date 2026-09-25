import Link from "next/link";

type Program = {
  id: string;
  name: string;
  slug: string;
  code: string;
  description: string | null;
  duration: number;
};

type Props = {
  program: Program;
  hrefSuffix?: string;
};

const themes = [
  ["border-sky-100 bg-sky-50/80", "bg-sky-100", "text-sky-600"],
  ["border-emerald-100 bg-emerald-50/80", "bg-emerald-100", "text-emerald-600"],
  ["border-amber-100 bg-amber-50/80", "bg-amber-100", "text-amber-600"],
  ["border-rose-100 bg-rose-50/80", "bg-rose-100", "text-rose-600"],
  ["border-violet-100 bg-violet-50/80", "bg-violet-100", "text-violet-600"],
  ["border-teal-100 bg-teal-50/80", "bg-teal-100", "text-teal-600"],
] as const;

function iconForProgram(name: string) {
  const value = name.toLowerCase();
  if (value.includes("pharma")) return "💊";
  if (value.includes("nursing")) return "🩺";
  if (value.includes("ayur")) return "🌿";
  if (value.includes("medical")) return "⚕️";
  return "🎓";
}

export function ProgramCard({ program, hrefSuffix = "" }: Props) {
  const name = program.name.toLowerCase();
  const index =
    name.includes("anm") ? 0 :
    name.includes("b-pharma") || name.includes("b pharma") ? 1 :
    name.includes("b.sc") || name.includes("bachelor") ? 2 :
    name.includes("bams") ? 3 :
    name.includes("nursing") ? 4 :
    name.includes("d. pharma") || name.includes("d pharma") ? 5 :
    Array.from(program.code).reduce(
      (sum, character) => sum + character.charCodeAt(0),
      0,
    ) % themes.length;

  const [cardTone, iconTone, textTone] = themes[index];

  return (
    <Link
      href={`/learn/programs/${program.slug}${hrefSuffix}`}
      className={`group relative block h-full overflow-hidden rounded-2xl border p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg ${cardTone}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/50" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconTone}`}>
            {iconForProgram(program.name)}
          </div>

          <span className={`rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${textTone}`}>
            Program
          </span>
        </div>

        <p className={`mt-5 text-[10px] font-bold uppercase tracking-[0.18em] ${textTone}`}>
          {program.code}
        </p>

        <h3 className="mt-1 text-xl font-black tracking-tight text-slate-950">
          {program.name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600">
          {program.description ??
            "Explore the structured curriculum for this program."}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
          <span className="text-xs text-slate-500">
            {program.duration} {program.duration === 1 ? "year" : "years"}
          </span>

          <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold ${textTone} transition group-hover:translate-x-1`}>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}