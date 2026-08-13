import {
    db,
    contents,
    subtopics,
    topics,
    units,
    subjects,
} from "@mediverse/database";

import { ilike, or, eq } from "drizzle-orm";

export async function searchLearnRepository(
    query: string,
) {
    const search = `%${query.trim()}%`;

    return db
        .select({
            contentId: contents.id,
            contentTitle: contents.title,
            contentSlug: contents.slug,

            subtopicId: subtopics.id,
            subtopicTitle: subtopics.title,

            topicId: topics.id,
            topicTitle: topics.title,

            unitId: units.id,
            unitTitle: units.title,

            subjectId: subjects.id,
            subjectName: subjects.name,
        })
        .from(contents)
        .innerJoin(
            subtopics,
            eq(contents.subtopicId, subtopics.id),
        )
        .innerJoin(
            topics,
            eq(subtopics.topicId, topics.id),
        )
        .innerJoin(
            units,
            eq(topics.unitId, units.id),
        )
        .innerJoin(
            subjects,
            eq(units.subjectId, subjects.id),
        )
        .where(
            or(
                ilike(contents.title, search),
                ilike(contents.summary, search),
                ilike(subtopics.title, search),
                ilike(topics.title, search),
                ilike(units.title, search),
                ilike(subjects.name, search),
            ),
        )
        .limit(30);
}