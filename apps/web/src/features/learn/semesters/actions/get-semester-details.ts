"use server";

import { getSemesterDetailsService } from "../services";

export async function getSemesterDetailsAction(
    semesterId: string
) {
    return getSemesterDetailsService(semesterId);
}