export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 p-8">
      <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />

      <div className="space-y-3">
        <div className="h-10 w-80 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-96 animate-pulse rounded bg-gray-200" />
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-xl border bg-gray-100"
          />
        ))}
      </section>

      <div className="h-56 animate-pulse rounded-xl border bg-gray-100" />
    </main>
  );
}