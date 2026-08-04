import { asc, eq } from "drizzle-orm";

import {
    db,
    topics,
} from "@mediverse/database";

export async function getTopicsByUnitRepository(
    unitId: string
) {
    return db
        .select()
        .from(topics)
        .where(eq(topics.unitId, unitId))
        .orderBy(asc(topics.topicNumber));
}