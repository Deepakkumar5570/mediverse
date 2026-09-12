import { asc } from "drizzle-orm";
import { notFound } from "next/navigation";

import {
    db,
    programs,
    semesters,
    subjects,
    topics,
    units,
} from "@mediverse/database";

import { getSubtopicsByTopicAction } from "@/src/features/subtopic/actions/get-subtopics";
import { getTopicByIdAction } from "@/src/features/topic/actions/get-topics";

import { ContentBuilder } from "@/src/features/subtopic/components/content-builder";

type PageProps = {
    searchParams?: Promise<{
        topicId?: string;
    }>;
};

export default async function ContentBuilderPage(
    props: PageProps,
) {
    const searchParams = await props.searchParams;
    const topicId = searchParams?.topicId;

    const [
        programList,
        semesterList,
        subjectList,
        unitList,
        topicList,
    ] = await Promise.all([
        db
            .select()
            .from(programs)
            .orderBy(asc(programs.name)),

        db
            .select()
            .from(semesters)
            .orderBy(asc(semesters.number)),

        db
            .select()
            .from(subjects)
            .orderBy(asc(subjects.name)),

        db
            .select()
            .from(units)
            .orderBy(asc(units.unitNumber)),

        db
            .select()
            .from(topics)
            .orderBy(asc(topics.topicNumber)),
    ]);

    let selectedTopic = null;
    let existingSubtopics: Awaited<
        ReturnType<typeof getSubtopicsByTopicAction>
    > = [];

    if (topicId) {
        [selectedTopic, existingSubtopics] =
            await Promise.all([
                getTopicByIdAction(topicId),
                getSubtopicsByTopicAction(topicId),
            ]);

        if (!selectedTopic) {
            notFound();
        }
    }

    const selectedUnit = selectedTopic
        ? unitList.find(
            (unit) => unit.id === selectedTopic.unitId,
        )
        : undefined;

    const selectedSubject = selectedUnit
        ? subjectList.find(
            (subject) =>
                subject.id === selectedUnit.subjectId,
        )
        : undefined;

    const selectedSemester = selectedSubject
        ? semesterList.find(
            (semester) =>
                semester.id === selectedSubject.semesterId,
        )
        : undefined;

    const selectedProgram = selectedSemester
        ? programList.find(
            (program) =>
                program.id === selectedSemester.programId,
        )
        : undefined;

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-8">
            <ContentBuilder
                programs={programList}
                semesters={semesterList}
                subjects={subjectList}
                units={unitList}
                topics={topicList}
                selectedTopicId={topicId}
                selectedTopic={selectedTopic}
                existingSubtopics={existingSubtopics}
                context={{
                    program: selectedProgram,
                    semester: selectedSemester,
                    subject: selectedSubject,
                    unit: selectedUnit,
                    topic: selectedTopic ?? undefined,
                }}
            />
        </main>
    );
}