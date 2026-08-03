"use server";

import { getSemesterByIdService } from "../services";

export async function getSemesterByIdAction(
    id: string
) {
    return getSemesterByIdService(id);
}