"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q")?.trim() ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  /*
   * Execute the actual search.
   *
   * This function is also used when a query comes from the URL,
   * so users don't have to press Search twice.
   */
  const runSearch = useCallback(async (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);

    try {
      const data = await searchLearnAction(trimmedValue);

      setResults(data);
      setSearched(true);
    } catch (error) {
      console.error("MediVerse search failed:", error);

      setResults([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * Read ?q= from the URL when the page first loads.
   *
   * Example:
   * /learn/search?q=anatomy
   *
   * This automatically:
   * 1. puts "anatomy" inside the input
   * 2. executes the search
   * 3. displays the results
   */
  useEffect(() => {
    if (!initialQuery) {
      return;
    }

    const timer = window.setTimeout(() => {
      void runSearch(initialQuery);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [initialQuery, runSearch]);

  async function handleSearch() {
    const value = query.trim();

    if (!value) {
      setResults([]);
      setSearched(false);
      return;
    }

    /*
     * Keep the search query in the browser URL.
     *
     * Example:
     * /learn/search?q=anatomy
     */
    router.replace(
      `/learn/search?q=${encodeURIComponent(value)}`,
      {
        scroll: false,
      }
    );

    await runSearch(value);
  }

  function clearSearch() {
    setQuery("");
    setResults([]);
    setSearched(false);

    /*
     * Remove ?q= from the URL as well.
     */
    router.replace("/learn/search", {
      scroll: false,
    });
  }

  return (
    <div className="space-y-8">
      {/* =========================================================
          SEARCH HERO
      ========================================================= */}
      <div
        className="
          overflow-hidden rounded-3xl
          border border-slate-200
          bg-gradient-to-br
          from-white via-slate-50 to-slate-100
          p-7 shadow-sm
          md:p-9
        "
      >
        <div className="max-w-2xl">
          <div
            className="
              mb-4 inline-flex items-center gap-2
              rounded-full border border-slate-200
              bg-white/80 px-3 py-1.5
              text-xs font-medium text-slate-600
              backdrop-blur
            "
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            MediVerse Knowledge Base
          </div>

          <h2
            className="
              text-2xl font-semibold tracking-tight
              text-slate-900
              md:text-3xl
            "
          >
            Find what you want to learn.
          </h2>

          <p
            className="
              mt-3 max-w-xl
              text-sm leading-6 text-slate-500
              md:text-base
            "
          >
            Search across subjects, units, topics,
            subtopics and lessons in your learning path.
          </p>
        </div>

        {/* =====================================================
            SEARCH BOX
        ===================================================== */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleSearch();
          }}
          className="mt-7"
        >
          <div
            className="
              flex flex-col gap-3
              rounded-2xl border border-slate-200
              bg-white p-2 shadow-sm
              sm:flex-row
            "
          >
            <div className="relative flex-1">
              <span
                className="
                  pointer-events-none absolute
                  left-4 top-1/2
                  -translate-y-1/2
                  text-lg text-slate-400
                "
              >
                🔎
              </span>

              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search subjects, topics, lessons..."
                aria-label="Search MediVerse learning content"
                className="
                  h-12 w-full rounded-xl
                  bg-slate-50
                  pl-11 pr-10
                  text-sm text-slate-900
                  outline-none
                  placeholder:text-slate-400
                  focus:bg-white
                  focus:ring-2
                  focus:ring-slate-200
                "
              />

              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="
                    absolute right-3 top-1/2
                    flex h-7 w-7
                    -translate-y-1/2
                    items-center justify-center
                    rounded-full
                    text-slate-400
                    transition
                    hover:bg-slate-200
                    hover:text-slate-700
                  "
                >
                  ×
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="
                h-12 rounded-xl
                bg-slate-900 px-6
                text-sm font-semibold text-white
                transition
                hover:bg-slate-800
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span
                    className="
                      h-4 w-4 animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />

                  Searching
                </span>
              ) : (
                "Search"
              )}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {["Subjects", "Topics", "Lessons"].map((item) => (
              <span
                key={item}
                className="
                  rounded-full
                  bg-slate-100
                  px-3 py-1.5
                  text-xs font-medium
                  text-slate-500
                "
              >
                {item}
              </span>
            ))}
          </div>
        </form>
      </div>

      {/* =========================================================
          RESULTS HEADER
      ========================================================= */}
      {searched && (
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Search results
            </p>

            <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
              {results.length > 0
                ? `${results.length} result${results.length === 1 ? "" : "s"
                } found`
                : "No results found"}
            </h3>

            {query && (
              <p className="mt-1 text-sm text-slate-500">
                Results for{" "}
                <span className="font-medium text-slate-700">
                  &quot;{query.trim()}&quot;
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          EMPTY RESULT STATE
      ========================================================= */}
      {searched && results.length === 0 && (
        <div
          className="
            rounded-3xl
            border border-dashed border-slate-300
            bg-slate-50/70
            px-6 py-14
            text-center
          "
        >
          <div
            className="
              mx-auto flex h-14 w-14
              items-center justify-center
              rounded-2xl bg-white
              text-2xl shadow-sm
            "
          >
            🔎
          </div>

          <h3 className="mt-5 text-base font-semibold text-slate-800">
            Nothing matched your search
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Try a different subject, topic, lesson name,
            or a shorter search phrase.
          </p>

          <button
            type="button"
            onClick={clearSearch}
            className="
              mt-5 rounded-xl
              bg-slate-900 px-5 py-2.5
              text-sm font-semibold text-white
              transition hover:bg-slate-800
            "
          >
            Clear search
          </button>
        </div>
      )}

      {/* =========================================================
          SEARCH RESULTS
      ========================================================= */}
      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((result) => (
            <Link
              key={result.contentId}
              href={`/learn/subtopics/${result.subtopicId}`}
              className="
                group block
                rounded-2xl
                border border-slate-200
                bg-white
                p-5 shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-slate-300
                hover:shadow-md
              "
            >
              <div className="flex gap-4">
                <div
                  className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-slate-100
                    text-lg
                    transition
                    group-hover:bg-slate-900
                    group-hover:text-white
                  "
                >
                  📖
                </div>

                <div className="min-w-0 flex-1">
                  <div
                    className="
                      flex flex-col gap-2
                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                    "
                  >
                    <div className="min-w-0">
                      <h3
                        className="
                          truncate
                          text-base font-semibold
                          text-slate-900
                          transition
                          group-hover:text-slate-700
                        "
                      >
                        {result.contentTitle}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {result.subtopicTitle}
                      </p>
                    </div>

                    <span
                      className="
                        shrink-0
                        text-sm font-medium
                        text-slate-400
                        transition
                        group-hover:translate-x-1
                        group-hover:text-slate-700
                      "
                    >
                      Explore →
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span
                      className="
                        rounded-lg
                        bg-slate-100
                        px-2.5 py-1
                        text-xs font-medium
                        text-slate-600
                      "
                    >
                      {result.subjectName}
                    </span>

                    <span className="text-slate-300">
                      •
                    </span>

                    <span className="text-xs text-slate-500">
                      {result.unitTitle}
                    </span>

                    <span className="text-slate-300">
                      •
                    </span>

                    <span className="text-xs text-slate-500">
                      {result.topicTitle}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* =========================================================
          INITIAL STATE
      ========================================================= */}
      {!searched && (
        <div
          className="
            rounded-3xl
            border border-slate-200
            bg-white
            p-7 shadow-sm
            md:p-8
          "
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div
              className="
                flex h-12 w-12 shrink-0
                items-center justify-center
                rounded-2xl bg-slate-100
                text-xl
              "
            >
              📚
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Explore the MediVerse knowledge base
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Search for a concept, subject, topic,
                or lesson to continue your learning journey.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}