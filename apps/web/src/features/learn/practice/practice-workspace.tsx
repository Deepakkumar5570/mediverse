"use client";

import { useState } from "react";

import { MCQPractice } from "@/src/features/learn/mcqs/components/mcq-practice";

import {
    getQuickPracticeMcqsAction,
    getRandomPracticeMcqsAction,
    getPracticeSemestersAction,
    searchPracticeTopicsAction,
} from "./practice.actions";

type Program = {
    id: string;
    name: string;
    code: string;
};

type Semester = {
    id: string;
    name: string;
    number: number;
};

type SearchResult = {
    id: string;
    title: string;
    type: "topic" | "subtopic";
    parentTitle: string;
    path: string;
    mcqCount: number;
};

type MCQ = {
    id: string;
    subtopicId: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    difficulty: string;
    questionNumber: number;
};

type Props =
    | {
        mode: "quick";
        programs: Program[];
    }
    | {
        mode: "random";
        programs: Program[];
    };

export function PracticeWorkspace({
    mode,
    programs,
}: Props) {
    const [selectedProgram, setSelectedProgram] =
        useState(programs.length === 1 ? programs[0]?.id ?? "" : "");

    const [semesters, setSemesters] = useState<
        Semester[]
    >([]);

    const [selectedSemester, setSelectedSemester] =
        useState("");

    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);

    const [results, setResults] = useState<
        SearchResult[]
    >([]);

    const [selectedCount, setSelectedCount] =
        useState(10);

    const [loadingSession, setLoadingSession] =
        useState(false);

    const [session, setSession] = useState<MCQ[] | null>(
        null,
    );

    async function handleProgramChange(
        programId: string,
    ) {
        setSelectedProgram(programId);
        setSelectedSemester("");
        setResults([]);

        if (mode === "random" && programId) {
            const nextSemesters =
                await getPracticeSemestersAction(
                    programId,
                );

            setSemesters(nextSemesters);
        } else {
            setSemesters([]);
        }
    }

    async function handleSearch() {
        if (
            !selectedProgram ||
            query.trim().length < 2
        ) {
            return;
        }

        setSearching(true);

        try {
            const response =
                await searchPracticeTopicsAction(
                    selectedProgram,
                    query,
                );

            const topicResults: SearchResult[] =
                response.topics.map((item) => ({
                    id: item.id,
                    title: item.title,
                    type: "topic",
                    parentTitle: item.subjectName,
                    path: `${item.semesterName} • ${item.unitTitle}`,
                    mcqCount: item.mcqCount,
                }));

            const subtopicResults: SearchResult[] =
                response.subtopics.map((item) => ({
                    id: item.id,
                    title: item.title,
                    type: "subtopic",
                    parentTitle: item.topicTitle,
                    path: `${item.semesterName} • ${item.subjectName} • ${item.unitTitle}`,
                    mcqCount: item.mcqCount,
                }));

            setResults([
                ...topicResults,
                ...subtopicResults,
            ]);
        } finally {
            setSearching(false);
        }
    }

    async function startQuickPractice(
        result: SearchResult,
    ) {
        if (result.mcqCount === 0) {
            return;
        }

        setLoadingSession(true);

        try {
            const questions =
                await getQuickPracticeMcqsAction(
                    result.type,
                    result.id,
                );

            setSession(questions);
        } finally {
            setLoadingSession(false);
        }
    }

    async function startRandomPractice() {
        if (!selectedSemester) {
            return;
        }

        setLoadingSession(true);

        try {
            const questions =
                await getRandomPracticeMcqsAction(
                    selectedSemester,
                    selectedCount,
                );

            setSession(questions);
        } finally {
            setLoadingSession(false);
        }
    }

    function resetSession() {
        setSession(null);
    }

    if (session) {
        return (
            <div className="space-y-5">
                <button
                    type="button"
                    onClick={resetSession}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                >
                    ← Back to Practice Setup
                </button>

                <MCQPractice
                    mcqs={session}
                    practiceMode={mode}
                />

                {session.length > 0 && (
                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4 text-sm text-indigo-800">
                        <span className="font-bold">
                            {session.length} questions
                        </span>{" "}
                        selected for this practice session.
                    </div>
                )}
            </div>
        );
    }

    if (mode === "quick") {
        return (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">
                        Quick Practice
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                        What do you want to practice?
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Choose your program first, then search for a topic
                        or subtopic. This keeps practice inside your
                        curriculum.
                    </p>
                </div>

                <div className="mt-7 space-y-5">
                    <div>
                        <label
                            htmlFor="quick-program"
                            className="mb-2 block text-sm font-bold text-slate-700"
                        >
                            Your program
                        </label>

                        <select
                            id="quick-program"
                            value={selectedProgram}
                            onChange={(event) =>
                                handleProgramChange(
                                    event.target.value,
                                )
                            }
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        >
                            <option value="">
                                Select your program
                            </option>

                            {programs.map((program) => (
                                <option
                                    key={program.id}
                                    value={program.id}
                                >
                                    {program.name}
                                    {program.code
                                        ? ` (${program.code})`
                                        : ""}
                                </option>
                            ))}
                        </select>
                    </div>

                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            void handleSearch();
                        }}
                    >
                        <label
                            htmlFor="quick-search"
                            className="mb-2 block text-sm font-bold text-slate-700"
                        >
                            Search topic or subtopic
                        </label>

                        <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:flex-row">
                            <input
                                id="quick-search"
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                disabled={!selectedProgram}
                                placeholder={
                                    selectedProgram
                                        ? "e.g. Chromophores, Alkaloids..."
                                        : "Select your program first"
                                }
                                className="h-12 min-w-0 flex-1 rounded-xl bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100"
                            />

                            <button
                                type="submit"
                                disabled={
                                    !selectedProgram ||
                                    query.trim().length < 2 ||
                                    searching
                                }
                                className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                {searching
                                    ? "Searching..."
                                    : "Search"}
                            </button>
                        </div>
                    </form>
                </div>

                {results.length > 0 && (
                    <div className="mt-8">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                                    Search results
                                </p>

                                <h3 className="mt-1 text-lg font-black text-slate-950">
                                    Choose what you want to practice
                                </h3>
                            </div>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                {results.length} results
                            </span>
                        </div>

                        <div className="space-y-3">
                            {results.map((result) => (
                                <div
                                    key={`${result.type}-${result.id}`}
                                    className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-sm"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-700">
                                                    {result.type}
                                                </span>

                                                <span className="text-xs font-semibold text-emerald-600">
                                                    {result.mcqCount} MCQs
                                                </span>
                                            </div>

                                            <h4 className="mt-2 text-base font-black text-slate-950">
                                                {result.title}
                                            </h4>

                                            <p className="mt-1 text-sm text-slate-600">
                                                {result.parentTitle}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                {result.path}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            disabled={
                                                result.mcqCount === 0 ||
                                                loadingSession
                                            }
                                            onClick={() =>
                                                void startQuickPractice(
                                                    result,
                                                )
                                            }
                                            className="shrink-0 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            {loadingSession
                                                ? "Loading..."
                                                : result.mcqCount === 0
                                                    ? "No MCQs"
                                                    : "Practice →"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {query.trim().length >= 2 &&
                    !searching &&
                    results.length === 0 && (
                        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                            <div className="text-3xl">🔎</div>

                            <h3 className="mt-3 font-black text-slate-950">
                                No matching topics found
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Try a different topic or subtopic name.
                            </p>
                        </div>
                    )}
            </section>
        );
    }

    return (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                    Random Practice
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                    Test yourself across a semester.
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Choose a program and semester. MediVerse will mix
                    active MCQs from the entire selected semester.
                </p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="random-program"
                        className="mb-2 block text-sm font-bold text-slate-700"
                    >
                        Program
                    </label>

                    <select
                        id="random-program"
                        value={selectedProgram}
                        onChange={(event) =>
                            void handleProgramChange(
                                event.target.value,
                            )
                        }
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    >
                        <option value="">
                            Select program
                        </option>

                        {programs.map((program) => (
                            <option
                                key={program.id}
                                value={program.id}
                            >
                                {program.name}
                                {program.code
                                    ? ` (${program.code})`
                                    : ""}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="random-semester"
                        className="mb-2 block text-sm font-bold text-slate-700"
                    >
                        Semester
                    </label>

                    <select
                        id="random-semester"
                        value={selectedSemester}
                        onChange={(event) =>
                            setSelectedSemester(
                                event.target.value,
                            )
                        }
                        disabled={!selectedProgram}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    >
                        <option value="">
                            {selectedProgram
                                ? "Select semester"
                                : "Select program first"}
                        </option>

                        {semesters.map((semester) => (
                            <option
                                key={semester.id}
                                value={semester.id}
                            >
                                {semester.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-7">
                <p className="mb-3 text-sm font-bold text-slate-700">
                    Number of questions
                </p>

                <div className="grid grid-cols-3 gap-3">
                    {[10, 20, 30].map((count) => (
                        <button
                            key={count}
                            type="button"
                            onClick={() =>
                                setSelectedCount(count)
                            }
                            className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${selectedCount === count
                                    ? "border-violet-500 bg-violet-50 text-violet-700 ring-2 ring-violet-100"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:bg-violet-50"
                                }`}
                        >
                            {count}
                        </button>
                    ))}
                </div>
            </div>

            <button
                type="button"
                disabled={
                    !selectedSemester ||
                    loadingSession
                }
                onClick={() =>
                    void startRandomPractice()
                }
                className="mt-7 w-full rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
                {loadingSession
                    ? "Preparing questions..."
                    : `Start Random Practice · ${selectedCount} Questions`}
            </button>

            <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm text-violet-800">
                <span className="font-bold">
                    What happens next?
                </span>{" "}
                MediVerse mixes active questions from all subjects,
                units, topics and subtopics inside your selected
                semester.
            </div>
        </section>
    );
}