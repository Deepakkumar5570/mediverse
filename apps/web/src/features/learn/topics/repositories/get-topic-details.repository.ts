import { eq } from "drizzle-orm";

import {
    db,
    programs,
    semesters,
    subjects,
    topics,
    units,
} from "@mediverse/database";

export async function getTopicDetailsRepository(
    topicId: string
) {
    const result = await db
        .select({
            topic: topics,
            unit: units,
            subject: subjects,
            semester: semesters,
            program: programs,
        })
        .from(topics)
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
        .where(eq(topics.id, topicId));

    return result[0] ?? null;
}