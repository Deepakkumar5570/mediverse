export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      <div className="space-y-3">
        <div className="h-10 w-80 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-96 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border p-6"
          >
            <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />

            <div className="mt-4 h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />

            <div className="mt-8 h-4 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}