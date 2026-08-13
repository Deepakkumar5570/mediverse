"use client";

import { useState } from "react";
import { searchLearnAction } from "../actions";

type SearchResult = {
    contentId: string;
    contentTitle: string;
    contentSlug: string;

    subtopicId: string;
    subtopicTitle: string;

    topicId: string;
    topicTitle: string;

    unitId: string;
    unitTitle: string;

    subjectId: string;
    subjectName: string;
};

export function LearnSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    async function handleSearch() {
        const value = query.trim();

        if (!value) {
            setResults([]);
            setSearched(false);
            return;
        }

        setLoading(true);

        try {
            const data = await searchLearnAction(value);

            setResults(data);
            setSearched(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex gap-3">
                <input
                    value={query}
                    onChange={(event) =>
                        setQuery(event.target.value)
                    }
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    placeholder="Search subjects, units, topics, or lessons..."
                    className="flex-1 rounded-xl border bg-white px-4 py-3 outline-none focus:ring-2"
                />

                <button
                    type="button"
                    onClick={handleSearch}
                    disabled={loading}
                    className="rounded-xl border px-5 py-3 font-medium transition hover:bg-gray-100 disabled:opacity-50"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>

            {searched && results.length === 0 && (
                <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
                    No learning content found.
                </div>
            )}

            {results.length > 0 && (
                <div className="space-y-4">
                    {results.map((result) => (
                        <a
                            key={result.contentId}
                            href={`/learn/subtopics/${result.subtopicId}`}
                            className="block rounded-xl border bg-white p-5 transition hover:shadow-sm"
                        >
                            <h3 className="text-lg font-semibold">
                                {result.contentTitle}
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                                {result.subjectName} •{" "}
                                {result.unitTitle} •{" "}
                                {result.topicTitle} •{" "}
                                {result.subtopicTitle}
                            </p>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}