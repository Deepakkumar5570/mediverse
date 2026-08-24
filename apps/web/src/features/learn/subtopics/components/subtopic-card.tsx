import Link from "next/link";

type Subtopic = {
    id: string;
    title: string;
    subtopicNumber: number;
};

type Props = {
    subtopic: Subtopic;
};

export function SubtopicCard({
    subtopic,
}: Props) {
    return (
        <Link
            href={`/learn/subtopics/${subtopic.id}`}
            className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/40"
        >
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-200/30 blur-2xl" />

            <div className="relative">
                <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                        {String(
                            subtopic.subtopicNumber,
                        ).padStart(2, "0")}
                    </div>

                    <span className="rounded-full border border-emerald-100 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                        Subtopic
                    </span>
                </div>

                <h3 className="mt-6 text-lg font-black tracking-tight text-slate-950">
                    {subtopic.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Subtopic {subtopic.subtopicNumber}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-emerald-100 pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                        Explore subtopic
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white transition-all group-hover:translate-x-1 group-hover:bg-teal-600">
                        →
                    </span>
                </div>
            </div>
        </Link>
    );
}