import { eq } from "drizzle-orm";

import {
    db,
    programs,
    semesters,
    subjects,
    units,
    topics,
    subtopics,
} from "@mediverse/database";

export async function getSubtopicDetailsRepository(
    subtopicId: string
) {
    const result = await db
        .select({
            subtopic: subtopics,
            topic: topics,
            unit: units,
            subject: subjects,
            semester: semesters,
            program: programs,
        })
        .from(subtopics)
        .innerJoin(
            topics,
            eq(subtopics.topicId, topics.id)
        )
        .innerJoin(
            units,
            eq(topics.unitId, units.id)
        )
        .innerJoin(
            subjects,
            eq(units.subjectId, subjects.id)
        )
        .innerJoin(
            semesters,
            eq(subjects.semesterId, semesters.id)
        )
        .innerJoin(
            programs,
            eq(semesters.programId, programs.id)
        )
        .where(eq(subtopics.id, subtopicId));

    return result[0] ?? null;
}