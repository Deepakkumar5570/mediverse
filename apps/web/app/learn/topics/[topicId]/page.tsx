import { notFound } from "next/navigation";

import {
    ExplorerGrid,
    PageTemplate,
    Section,
    StatCard,
} from "@/src/components/learn";

import {
    getTopicDetailsAction,
} from "@/src/features/learn/topics";

import {
    getSubtopicsByTopicAction,
    SubtopicCard,
} from "@/src/features/learn/subtopics";

type Props = {
    params: Promise<{
        topicId: string;
    }>;
};

export default async function TopicDetailsPage({
    params,
}: Props) {
    const { topicId } = await params;

    const details = await getTopicDetailsAction(topicId);

    if (!details) {
        notFound();
    }

    const subtopics = await getSubtopicsByTopicAction(topicId);

    const {
        topic,
        unit,
        subject,
        semester,
        program,
    } = details;

    return (
        <PageTemplate
            title={topic.title}
            description={`${unit.title} • Topic ${topic.topicNumber}`}
            sidebarTitle="Topic"
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
                    href: `/learn/units/${unit.id}`,
                },
                {
                    label: topic.title,
                },
            ]}
            sidebar={[
                {
                    label: "Overview",
                    href: "#overview",
                },
                {
                    label: "Subtopics",
                    href: "#subtopics",
                },
            ]}
        >
            <section className="grid gap-6 md:grid-cols-3">
                <StatCard
                    label="Subtopics"
                    value={subtopics.length}
                />

                <StatCard
                    label="Topic Number"
                    value={topic.topicNumber}
                />

                <StatCard
                    label="Status"
                    value={topic.status}
                />
            </section>

            <Section title="Overview">
                <div className="rounded-xl border bg-white p-6">
                    <p className="text-gray-600">
                        {topic.description ??
                            "No description available."}
                    </p>
                </div>
            </Section>

            <Section title="Subtopics">
                {subtopics.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
                        No subtopics available.
                    </div>
                ) : (
                    <ExplorerGrid>
                        {subtopics.map((subtopic) => (
                            <SubtopicCard
                                key={subtopic.id}
                                subtopic={subtopic}
                            />
                        ))}
                    </ExplorerGrid>
                )}
            </Section>
        </PageTemplate>
    );
}