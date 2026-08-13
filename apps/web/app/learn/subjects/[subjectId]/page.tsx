import { notFound } from "next/navigation";

import {
    ExplorerGrid,
    PageTemplate,
    Section,
    StatCard,
} from "@/src/components/learn";
import {
    getSubjectDetailsAction,
} from "@/src/features/learn/subjects";

import {
    getUnitsBySubjectAction,
    UnitCard,
} from "@/src/features/learn/units";

type Props = {
    params: Promise<{
        subjectId: string;
    }>;
};

export default async function SubjectDetailsPage({
    params,
}: Props) {
    const { subjectId } = await params;

    const details =
        await getSubjectDetailsAction(
            subjectId
        );

    if (!details) {
        notFound();
    }

    const units =
        await getUnitsBySubjectAction(
            subjectId
        );

    const {
        subject,
        semester,
        program,
    } = details;

    return (
        <PageTemplate
            title={subject.name}
            description={`${program.name} • ${subject.code}`}
            sidebarTitle="Subject"
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
                    href: `/learn/semesters/${semester.id}`,
                },
                {
                    label: subject.name,
                },
            ]}
            sidebar={[
                {
                    label: "Overview",
                    href: "#overview",
                },
                {
                    label: "Units",
                    href: "#units",
                },
            ]}
        >
            <section className="grid gap-6 md:grid-cols-3">
                <StatCard
                    label="Units"
                    value={units.length}
                />

                <StatCard
                    label="Subject Code"
                    value={subject.code}
                />

                <StatCard
                    label="Status"
                    value={subject.status}
                />
            </section>

            <Section title="Overview"
                id="overview">
                <div className="rounded-xl border bg-white p-6">
                    <p className="text-gray-600">
                        {subject.description ??
                            "No description available."}
                    </p>
                </div>
            </Section>

            <Section
                title="Units"
                id="units">
                {units.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
                        No units available.
                    </div>
                ) : (
                    <ExplorerGrid>
                        {units.map((unit) => (
                            <UnitCard
                                key={unit.id}
                                unit={unit}
                            />
                        ))}
                    </ExplorerGrid>
                )}
            </Section>
        </PageTemplate>
    );
}