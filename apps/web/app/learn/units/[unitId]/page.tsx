import { notFound } from "next/navigation";

import {
    ExplorerGrid,
    PageTemplate,
    Section,
    StatCard,
} from "@/src/components/learn";

import {
    getUnitDetailsAction,
} from "@/src/features/learn/units";

import {
    getTopicsByUnitAction,
    TopicCard,
} from "@/src/features/learn/topics";

type Props = {
    params: Promise<{
        unitId: string;
    }>;
};

export default async function UnitDetailsPage({
    params,
}: Props) {
    const { unitId } = await params;

    const details = await getUnitDetailsAction(unitId);

    if (!details) {
        notFound();
    }

    const topics = await getTopicsByUnitAction(unitId);

    const {
        unit,
        subject,
        semester,
        program,
    } = details;

    return (
        <PageTemplate
            title={unit.title}
            description={`${subject.name} • Unit ${unit.unitNumber}`}
            sidebarTitle="Unit"
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
                    href: `/learn/subjects/${subject.id}`,
                },
                {
                    label: unit.title,
                },
            ]}
            sidebar={[
                {
                    label: "Overview",
                    href: "#overview",
                },
                {
                    label: "Topics",
                    href: "#topics",
                },
            ]}
        >
            <section className="grid gap-6 md:grid-cols-3">
                <StatCard
                    label="Topics"
                    value={topics.length}
                />

                <StatCard
                    label="Unit Number"
                    value={unit.unitNumber}
                />

                <StatCard
                    label="Status"
                    value={unit.status}
                />
            </section>

            <Section
                title="Overview"
                id="overview"
            >
                <div className="rounded-xl border bg-white p-6">
                    <p className="text-gray-600">
                        {unit.description ??
                            "No description available."}
                    </p>
                </div>
            </Section>

            <Section
                title="Topics"
                id="topics"
            >
                {topics.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
                        No topics available.
                    </div>
                ) : (
                    <ExplorerGrid>
                        {topics.map((topic) => (
                            <TopicCard
                                key={topic.id}
                                topic={topic}
                            />
                        ))}
                    </ExplorerGrid>
                )}
            </Section>
        </PageTemplate>
    );
}