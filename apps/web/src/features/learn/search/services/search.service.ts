import { searchLearnRepository } from "../repositories";

export async function searchLearnService(query: string) {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
        return [];
    }

    return searchLearnRepository(normalizedQuery);
}