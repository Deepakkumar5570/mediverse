import { db, flashcards } from "@mediverse/database";
import { asc, eq } from "drizzle-orm";

export async function getFlashcardsByContentRepository(
    contentId: string,
) {
    return db
        .select()
        .from(flashcards)
        .where(eq(flashcards.contentId, contentId))
        .orderBy(asc(flashcards.cardNumber));
}