import { eq } from "drizzle-orm";

import {
    db,
    semesters,
} from "@mediverse/database";

export async function getSemesterByIdRepository(
    id: string
) {
    const [semester] = await db
        .select()
        .from(semesters)
        .where(eq(semesters.id, id));

    return semester ?? null;
}