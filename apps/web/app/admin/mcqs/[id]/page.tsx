import Link from "next/link";
import { notFound } from "next/navigation";

import {
    db,
    mcqs,
    subtopics,
} from "@mediverse/database";

import {
    MCQDeleteButton,
} from "@/src/features/learn/mcqs/components";

import { eq } from "drizzle-orm";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function MCQDetailsPage({
    params,
}: Props) {
    const { id } = await params;

    const [mcq] = await db
        .select({
            id: mcqs.id,
            question: mcqs.question,
            optionA: mcqs.optionA,
            optionB: mcqs.optionB,
            optionC: mcqs.optionC,
            optionD: mcqs.optionD,
            correctOption: mcqs.correctOption,
            explanation: mcqs.explanation,
            difficulty: mcqs.difficulty,
            questionNumber: mcqs.questionNumber,
            status: mcqs.status,
            subtopicId: mcqs.subtopicId,
            subtopicTitle: subtopics.title,
        })
        .from(mcqs)
        .leftJoin(
            subtopics,
            eq(mcqs.subtopicId, subtopics.id),
        )
        .where(eq(mcqs.id, id))
        .limit(1);

    if (!mcq) {
        notFound();
    }

    const options = [
        {
            label: "A",
            value: mcq.optionA,
            number: 1,
        },
        {
            label: "B",
            value: mcq.optionB,
            number: 2,
        },
        {
            label: "C",
            value: mcq.optionC,
            number: 3,
        },
        {
            label: "D",
            value: mcq.optionD,
            number: 4,
        },
    ];

    return (
        <main className="min-h-screen bg-slate-50/70">
            <div className="mx-auto max-w-5xl space-y-8 p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-violet-600">
                            MediVerse CMS
                        </p>

                        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                            MCQ #{mcq.questionNumber}
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            {mcq.subtopicTitle ??
                                "Unknown subtopic"}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href="/admin/mcqs"
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            Back
                        </Link>

                        <Link
                            href={`/admin/mcqs/${mcq.id}/edit`}
                            className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-violet-600"
                        >
                            Edit MCQ
                        </Link>

                        <MCQDeleteButton id={mcq.id} />
                    </div>
                </div>

                {/* Metadata */}
                <section className="grid gap-4 sm:grid-cols-3">
                    <InfoCard
                        label="Subtopic"
                        value={
                            mcq.subtopicTitle ??
                            "Unknown"
                        }
                    />

                    <InfoCard
                        label="Difficulty"
                        value={mcq.difficulty}
                    />

                    <InfoCard
                        label="Status"
                        value={mcq.status}
                    />
                </section>

                {/* Question */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                        Question
                    </p>

                    <h2 className="mt-4 text-xl font-bold leading-8 text-slate-950 md:text-2xl">
                        {mcq.question}
                    </h2>

                    <div className="mt-8 space-y-3">
                        {options.map((option) => {
                            const correct =
                                option.number ===
                                mcq.correctOption;

                            return (
                                <div
                                    key={option.label}
                                    className={`flex gap-4 rounded-2xl border p-4 ${correct
                                            ? "border-emerald-300 bg-emerald-50"
                                            : "border-slate-200 bg-white"
                                        }`}
                                >
                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${correct
                                                ? "bg-emerald-500 text-white"
                                                : "bg-slate-100 text-slate-700"
                                            }`}
                                    >
                                        {option.label}
                                    </span>

                                    <div className="flex-1 pt-1">
                                        <p className="text-sm leading-6 text-slate-700">
                                            {option.value}
                                        </p>

                                        {correct && (
                                            <p className="mt-2 text-xs font-bold text-emerald-700">
                                                Correct answer
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Explanation */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
                        Explanation
                    </p>

                    <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                        {mcq.explanation ||
                            "No explanation added."}
                    </p>
                </section>
            </div>
        </main>
    );
}

function InfoCard({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {label}
            </p>

            <p className="mt-2 text-sm font-bold capitalize text-slate-900">
                {value}
            </p>
        </div>
    );
}