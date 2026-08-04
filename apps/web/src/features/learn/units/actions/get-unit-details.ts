"use server";

import { getUnitDetailsService } from "../services";

export async function getUnitDetailsAction(
    unitId: string
) {
    return getUnitDetailsService(unitId);
}