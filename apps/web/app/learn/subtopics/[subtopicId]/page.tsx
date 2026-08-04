import { notFound } from "next/navigation";

import {
    PageTemplate,
    Section,
    StatCard,
} from "@/src/components/learn";

import {
    getSubtopicDetailsAction,
} from "@/src/features/learn/subtopics";

type Props = {
    params: Promise<{
        subtopicId: string;
    }>;
};

export default async function SubtopicDetailsPage({
    params,
}: Props) {
    const { subtopicId } = await params;

    const details =
        await getSubtopicDetailsAction(subtopicId);

    if (!details) {
        notFound();
    }

    const {
        subtopic,
        topic,
        unit,
        subject,
        semester,
        program,
    } = details;

    return (
        <PageTemplate
            title={subtopic.title}
            description={`${topic.title} • Subtopic ${subtopic.subtopicNumber}`}
            sidebarTitle="Subtopic"
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
                    href: `/learn/topics/${topic.id}`,
                },
                {
                    label: subtopic.title,
                },
            ]}
            sidebar={[
                {
                    label: "Overview",
                    href: "#overview",
                },
            ]}
        >
            <section className="grid gap-6 md:grid-cols-3">
                <StatCard
                    label="Subtopic Number"
                    value={subtopic.subtopicNumber}
                />

                <StatCard
                    label="Status"
                    value={subtopic.status}
                />

                <StatCard
                    label="Topic"
                    value={topic.title}
                />
            </section>

            <Section title="Overview">
                <div className="rounded-xl border bg-white p-6">
                    <p className="text-gray-600">
                        {subtopic.description ??
                            "No description available."}
                    </p>
                </div>
            </Section>
        </PageTemplate>
    );
}