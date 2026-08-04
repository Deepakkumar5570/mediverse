import { asc, eq } from "drizzle-orm";

import {
    db,
    subtopics,
} from "@mediverse/database";

export async function getSubtopicsByTopicRepository(
    topicId: string
) {
    return db
        .select()
        .from(subtopics)
        .where(eq(subtopics.topicId, topicId))
        .orderBy(asc(subtopics.subtopicNumber));
}