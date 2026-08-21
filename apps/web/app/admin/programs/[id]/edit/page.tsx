import Link from "next/link";
import { notFound } from "next/navigation";

import { ProgramForm } from "@/src/features/program/components/program-form";
import { getProgramByIdRepository } from "@/src/features/program/repositories/program.repository";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditProgramPage({
    params,
}: Props) {
    const { id } = await params;

    const program = await getProgramByIdRepository(id);

    if (!program) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-4xl space-y-8 p-8">
            <div>
                <Link
                    href="/admin/programs"
                    className="
            text-sm font-medium
            text-slate-500
            transition
            hover:text-slate-900
          "
                >
                    ← Back to Programs
                </Link>

                <h1 className="mt-4 text-3xl font-bold text-slate-900">
                    Edit Program
                </h1>

                <p className="mt-2 text-slate-500">
                    Update this MediVerse academic program.
                </p>
            </div>

            <ProgramForm
                initialData={{
                    id: program.id,
                    name: program.name,
                    slug: program.slug,
                    code: program.code,
                    description: program.description,
                    duration: program.duration,
                    status:
                        program.status === "inactive"
                            ? "inactive"
                            : "active",
                }}
            />
        </main>
    );
}