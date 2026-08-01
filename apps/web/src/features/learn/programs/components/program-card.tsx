import Link from "next/link";

type Program = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

type Props = {
  program: Program;
};

export function ProgramCard({
  program,
}: Props) {
  return (
    <Link
      href={`/learn/programs/${program.slug}`}
      className="block rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
    >
      <h2 className="text-2xl font-semibold">
        {program.name}
      </h2>

      <p className="mt-3 text-gray-600">
        {program.description ??
          "No description available."}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-blue-600 font-medium">
          Explore →
        </span>
      </div>
    </Link>
  );
}