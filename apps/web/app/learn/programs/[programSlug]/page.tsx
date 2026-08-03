import Link from "next/link";
import { notFound } from "next/navigation";

// import { getProgramBySlugAction } from "../../../../src/features/learn/programs";
import { getProgramBySlugAction } from "@/src/features/learn/programs";
import {
    PageHeader,
    StatCard,
} from "@/src/components/learn";
import {
    ExplorerGrid,
    Section,
} from "@/src/components/learn";

import {
    getSemestersByProgramAction,
    SemesterCard,
} from "@/src/features/learn/semesters";

type Props = {
    params: Promise<{
        programSlug: string;
    }>;
};

export default async function ProgramDetailsPage({
    params,
}: Props) {
    const { programSlug } = await params;

    const program =
        await getProgramBySlugAction(programSlug);
    const semesters =
        program
            ? await getSemestersByProgramAction(program.id)
            : [];

    if (!program) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-7xl space-y-10 p-8">
            <Link
                href="/learn/programs"
                className="text-blue-600 hover:underline"
            >
                ← Back to Programs
            </Link>

            <PageHeader
                title={program.name}
                description={program.description}
            />

            <section className="grid gap-6 md:grid-cols-3">
                <StatCard
                    label="Semesters"
                    value="Coming Soon"
                />

                <StatCard
                    label="Subjects"
                    value="Coming Soon"
                />

                <StatCard
                    label="Articles"
                    value="Coming Soon"
                />
            </section>

            <section className="rounded-xl border bg-white p-8">
                <h2 className="text-2xl font-semibold">
                    About this Program
                </h2>

                <p className="mt-4 text-gray-600">
                    {program.description ??
                        "No description available."}
                </p>
            </section>

            <Section
                title="Semesters"
                description="Browse all semesters available in this program."
            >
                {semesters.length === 0 ? (
                    <p className="text-gray-500">
                        No semesters have been added to this
                        program yet.
                    </p>
                ) : (
                    <ExplorerGrid>
                        {semesters.map((semester) => (
                            <SemesterCard
                                key={semester.id}
                                semester={semester}
                            />
                        ))}
                    </ExplorerGrid>
                )}
            </Section>
        </main>
    );
}