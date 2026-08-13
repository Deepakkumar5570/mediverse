"use server";

import { searchLearnService } from "../services";

export async function searchLearnAction(query: string) {
    return searchLearnService(query);
}