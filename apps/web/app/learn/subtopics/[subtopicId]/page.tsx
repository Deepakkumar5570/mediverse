import { notFound } from "next/navigation";

import {
    PageTemplate,
    Section,
    StatCard,
} from "@/src/components/learn";

import {
    getSubtopicDetailsAction,
} from "@/src/features/learn/subtopics";

import {
    getContentBySubtopicAction,
    getLessonNavigationAction,
    LessonNavigation,
    ReadingEngine,
} from "@/src/features/learn/content";

import {
    getContentProgressAction,
} from "@/src/features/progress";

import {
    FlashcardDeck,
    getFlashcardsByContentAction,
} from "@/src/features/learn/flashcards";

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

    const lesson =
        await getContentBySubtopicAction(
            subtopicId,
        );

    const lessonProgress = lesson
        ? await getContentProgressAction(lesson.id)
        : null;

    const lessonNavigation =
        await getLessonNavigationAction(
            subtopicId,
        );

    const flashcards = lesson
        ? await getFlashcardsByContentAction(lesson.id)
        : [];

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
                {
                    label: "Flashcards",
                    href: "#flashcards",
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

            <Section title="Overview"
                id="overview">
                <div className="rounded-xl border bg-white p-6">
                    <p className="text-gray-600">
                        {subtopic.description ??
                            "No description available."}
                    </p>
                </div>
            </Section>

            <Section title="Lesson"
                id="lesson">
                {lesson ? (
                    <ReadingEngine
                        contentId={lesson.id}
                        title={lesson.title}
                        summary={lesson.summary}
                        content={lesson.content}
                        readingTime={lesson.readingTime}
                        initialCompleted={lessonProgress?.completed ?? false}
                    />
                ) : (
                    <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
                        Lesson content not available.
                    </div>
                )}

                <LessonNavigation
                    previous={lessonNavigation?.previous}
                    next={lessonNavigation?.next}
                />


            </Section>


            <Section
                id="flashcards"
                title="Flashcards"
            >
                <FlashcardDeck flashcards={flashcards} />
            </Section>




        </PageTemplate>
    );
}