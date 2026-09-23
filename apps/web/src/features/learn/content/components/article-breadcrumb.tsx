import Link from "next/link";

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type Props = {
    items: BreadcrumbItem[];
};

function Chevron() {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-slate-300"
        >
            <path
                d="M6 3.5L10 8L6 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function HomeIcon() {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="h-4 w-4"
        >
            <path
                d="M3.5 9.25L10 3.75L16.5 9.25V16C16.5 16.69 15.94 17.25 15.25 17.25H4.75C4.06 17.25 3.5 16.69 3.5 16V9.25Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path
                d="M7.5 17.25V12.25H12.5V17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ArticleBreadcrumb({
    items,
}: Props) {
    return (
        <nav
            aria-label="Lesson navigation"
            className="overflow-x-auto border-b border-slate-100 pb-4 [scrollbar-width:none]"
        >
            <ol className="flex min-w-max items-center gap-1.5 text-[12px]">
                <li className="flex items-center">
                    <Link
                        href="/learn"
                        aria-label="Learn home"
                        className="inline-flex items-center rounded-md p-1 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                    >
                        <HomeIcon />
                    </Link>
                </li>

                {items.map((item, index) => {
                    const isLast =
                        index ===
                        items.length - 1;

                    return (
                        <li
                            key={`${item.label}-${index}`}
                            className="flex min-w-0 items-center gap-1.5"
                        >
                            <Chevron />

                            {item.href &&
                            !isLast ? (
                                <Link
                                    href={
                                        item.href
                                    }
                                    className="max-w-[180px] truncate rounded-md px-1.5 py-1 font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    aria-current={
                                        isLast
                                            ? "page"
                                            : undefined
                                    }
                                    className={[
                                        "max-w-[220px] truncate rounded-md px-1.5 py-1",
                                        isLast
                                            ? "font-semibold text-slate-950"
                                            : "font-medium text-slate-500",
                                    ].join(
                                        " ",
                                    )}
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}