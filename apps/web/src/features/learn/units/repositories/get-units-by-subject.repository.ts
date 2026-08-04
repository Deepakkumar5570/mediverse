import { asc, eq } from "drizzle-orm";

import {
    db,
    units,
} from "@mediverse/database";

export async function getUnitsBySubjectRepository(
    subjectId: string
) {
    return db
        .select()
        .from(units)
        .where(eq(units.subjectId, subjectId))
        .orderBy(asc(units.unitNumber));
}