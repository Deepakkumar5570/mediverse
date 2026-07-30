"use server";

import { searchContentsService } from "../services";

export async function searchContentsAction(
    search: string
) {
    const query = search.trim();

    if (!query) {
        return [];
    }

    return searchContentsService(query);
}