import Link from "next/link";

type Program = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
};

type Props = {
    program: Program;
};

function getProgramTheme(slug: string) {
    const themes = [
        {
            gradient: "from-indigo-500/15 via-indigo-50 to-white",
            iconBg: "bg-indigo-100 text-indigo-700",
            badge: "bg-indigo-50 text-indigo-700 border-indigo-100",
            arrow: "bg-indigo-600",
            glow: "bg-indigo-200/40",
        },
        {
            gradient: "from-violet-500/15 via-violet-50 to-white",
            iconBg: "bg-violet-100 text-violet-700",
            badge: "bg-violet-50 text-violet-700 border-violet-100",
            arrow: "bg-violet-600",
            glow: "bg-violet-200/40",
        },
        {
            gradient: "from-emerald-500/15 via-emerald-50 to-white",
            iconBg: "bg-emerald-100 text-emerald-700",
            badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
            arrow: "bg-emerald-600",
            glow: "bg-emerald-200/40",
        },
        {
            gradient: "from-amber-500/15 via-amber-50 to-white",
            iconBg: "bg-amber-100 text-amber-700",
            badge: "bg-amber-50 text-amber-700 border-amber-100",
            arrow: "bg-amber-500",
            glow: "bg-amber-200/40",
        },
        {
            gradient: "from-sky-500/15 via-sky-50 to-white",
            iconBg: "bg-sky-100 text-sky-700",
            badge: "bg-sky-50 text-sky-700 border-sky-100",
            arrow: "bg-sky-600",
            glow: "bg-sky-200/40",
        },
        {
            gradient: "from-rose-500/15 via-rose-50 to-white",
            iconBg: "bg-rose-100 text-rose-700",
            badge: "bg-rose-50 text-rose-700 border-rose-100",
            arrow: "bg-rose-600",
            glow: "bg-rose-200/40",
        },
    ];

    const index = Array.from(slug).reduce(
        (total, character) => total + character.charCodeAt(0),
        0,
    );

    return themes[index % themes.length];
}

function getProgramIcon(name: string) {
    const value = name.toLowerCase();

    if (value.includes("pharma")) {
        return "💊";
    }

    if (value.includes("nursing")) {
        return "🩺";
    }

    if (value.includes("ayur")) {
        return "🌿";
    }

    if (value.includes("medical")) {
        return "⚕️";
    }

    if (value.includes("btech") || value.includes("tech")) {
        return "💻";
    }

    return "🎓";
}

export function ProgramCard({ program }: Props) {
    const theme = getProgramTheme(program.slug);
    const icon = getProgramIcon(program.name);

    return (
        <Link
            href={`/learn/programs/${program.slug}`}
            className="group relative block h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/70"
        >
            {/* Decorative glow */}
            <div
                className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full ${theme.glow} blur-3xl transition-transform duration-500 group-hover:scale-125`}
            />

            <div
                className={`relative flex h-full min-h-[285px] flex-col bg-gradient-to-br ${theme.gradient} p-6`}
            >
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl shadow-sm ${theme.iconBg}`}
                    >
                        {icon}
                    </div>

                    <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${theme.badge}`}
                    >
                        Program
                    </span>
                </div>

                {/* Content */}
                <div className="mt-6 flex-1">
                    <h3 className="text-xl font-black tracking-tight text-slate-950">
                        {program.name}
                    </h3>

                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">
                        {program.description ||
                            "Explore this academic program and discover its learning path on MediVerse."}
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-200/70 pt-5">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                        Explore program
                    </span>

                    <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white transition-all duration-300 ${theme.arrow} group-hover:translate-x-1 group-hover:shadow-md`}
                    >
                        →
                    </span>
                </div>
            </div>
        </Link>
    );
}