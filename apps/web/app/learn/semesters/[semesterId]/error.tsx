"use client";

type Props = {
    error: Error;
    reset: () => void;
};

export default function Error({
    error,
    reset,
}: Props) {
    return (
        <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 p-8 text-center">
            <h1 className="text-3xl font-bold">
                Something went wrong
            </h1>

            <p className="text-gray-500">
                {error.message}
            </p>

            <button
                onClick={reset}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
                Try Again
            </button>
        </main>
    );
}