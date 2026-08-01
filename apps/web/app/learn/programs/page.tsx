import { getProgramsAction } from "../../../src/features/learn/programs";
import { ProgramCard } from "../../../src/features/learn/programs";

export default async function ProgramsPage() {
  const programs = await getProgramsAction();

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      <section>
        <h1 className="text-4xl font-bold">
          Browse Programs
        </h1>

        <p className="mt-2 text-gray-600">
          Choose your academic program to begin learning.
        </p>
      </section>

      {programs.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <h2 className="text-xl font-semibold">
            No Programs Available
          </h2>

          <p className="mt-2 text-gray-500">
            Programs will appear here once they are created in the
            Admin CMS.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
            />
          ))}
        </section>
      )}
    </main>
  );
}