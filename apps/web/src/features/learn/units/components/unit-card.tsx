import Link from "next/link";

type Unit = {
    id: string;
    title: string;
    slug: string;
    unitNumber: number;
};

type Props = {
    unit: Unit;
};

export function UnitCard({
    unit,
}: Props) {
    return (
        <Link
            href={`/learn/units/${unit.id}`}
            className="group relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40"
        >
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-200/30 blur-2xl" />

            <div className="relative">
                <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-indigo-700 shadow-sm ring-1 ring-indigo-100">
                        {String(unit.unitNumber).padStart(2, "0")}
                    </div>

                    <span className="rounded-full border border-indigo-100 bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                        Unit
                    </span>
                </div>

                <h3 className="mt-6 text-lg font-black tracking-tight text-slate-950">
                    {unit.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Unit {unit.unitNumber}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-indigo-100 pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                        Explore unit
                    </span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white transition-all group-hover:translate-x-1 group-hover:bg-violet-600">
                        →
                    </span>
                </div>
            </div>
        </Link>
    );
}