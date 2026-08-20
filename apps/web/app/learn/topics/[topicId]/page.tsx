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



import {
    getContentProgressAction,
    getSubtopicProgressAction,
    getSingleTopicProgressAction,
} from "@/src/features/progress";



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

    const topicProgress =
        await getSingleTopicProgressAction(
            topicId,
        );

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
                    label: "Progress",
                    href: "#progress",
                },
                {
                    label: "Subtopics",
                    href: "#subtopics",
                },
            ]}
        >
            <section className="grid gap-6 md:grid-cols-4">
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

                <StatCard
                    label="Progress"
                    value={`${topicProgress.percentage}%`}
                />
            </section>

            <Section title="Overview"
                id="overview">
                <div className="rounded-xl border bg-white p-6">
                    <p className="text-gray-600">
                        {topic.description ??
                            "No description available."}
                    </p>
                </div>
            </Section>



            <Section
                title="Your Progress"
                id="progress"
            >
                <div className="rounded-xl border bg-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Topic completion
                            </p>

                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-4xl font-semibold text-slate-900">
                                    {topicProgress.percentage}
                                </span>

                                <span className="text-lg text-slate-400">
                                    %
                                </span>
                            </div>
                        </div>

                        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                            {topicProgress.completed} of{" "}
                            {topicProgress.total} lessons completed
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500"
                                style={{
                                    width: `${topicProgress.percentage}%`,
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-3 flex justify-between text-xs text-slate-400">
                        <span>Start</span>
                        <span>{topicProgress.percentage}% complete</span>
                        <span>100%</span>
                    </div>

                    <p className="mt-5 text-sm text-slate-500">
                        {topicProgress.percentage === 100
                            ? "Amazing. You've completed this entire topic."
                            : topicProgress.percentage > 0
                                ? "Good progress. Keep learning one lesson at a time."
                                : "Your topic journey starts here."}
                    </p>
                </div>
            </Section>

            <Section title="Subtopics"
                id="subtopics">
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