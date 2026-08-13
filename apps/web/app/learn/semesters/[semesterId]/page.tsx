import { notFound } from "next/navigation";

import {
    ExplorerGrid,
    PageTemplate,
    Section,
    StatCard,
} from "@/src/components/learn";

import {
    getSemesterDetailsAction,
} from "@/src/features/learn/semesters";

import {
    getSubjectsBySemesterAction,
    SubjectCard,
} from "@/src/features/learn/subjects";

type Props = {
    params: Promise<{
        semesterId: string;
    }>;
};

export default async function SemesterDetailsPage({
    params,
}: Props) {
    const { semesterId } = await params;

    const details =
        await getSemesterDetailsAction(
            semesterId
        );

    if (!details) {
        notFound();
    }

    const subjects =
        await getSubjectsBySemesterAction(
            semesterId
        );

    const {
        semester,
        program,
    } = details;

    return (
        <PageTemplate
            title={semester.name}
            description={`${program.name} • Semester ${semester.number}`}
            breadcrumbs={[
                {
                    label: "Programs",
                    href: "/learn/programs",
                },
                {
                    label: program.name,
                    href: `/learn/programs/${program.slug}`,
                },
                {
                    label: semester.name,
                },
            ]}
            sidebarTitle="Semester"
            sidebar={[
                {
                    label: "Overview",
                    href: "#overview",
                },
                {
                    label: "Subjects",
                    href: "#subjects",
                },
            ]}
        >
            <section className="grid gap-6 md:grid-cols-3">
                <StatCard
                    label="Subjects"
                    value={subjects.length}
                />

                <StatCard
                    label="Semester"
                    value={semester.number}
                />

                <StatCard
                    label="Status"
                    value={semester.status}
                />
            </section>

            <Section
                title="Overview"
                id="overview"
            >
                <div className="rounded-xl border bg-white p-6">
                    <p className="text-gray-600">
                        Semester {semester.number} of{" "}
                        {program.name}.
                    </p>
                </div>
            </Section>

            <Section
                title="Subjects"
                id="subjects"
            >
                {subjects.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
                        No subjects available.
                    </div>
                ) : (
                    <ExplorerGrid>
                        {subjects.map((subject) => (
                            <SubjectCard
                                key={subject.id}
                                subject={subject}
                                // semesterId={semester.id}
                                // programSlug={program.slug}
                            />
                        ))}
                    </ExplorerGrid>
                )}
            </Section>
        </PageTemplate>


    );
}