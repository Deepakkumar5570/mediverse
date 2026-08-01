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
    <main className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center p-8">
      <div className="rounded-xl border p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Unable to Load Program
        </h1>

        <p className="mt-4 text-gray-600">
          {error.message}
        </p>

        <button
          onClick={reset}
          className="mt-6 rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}