"use server";

import { getTopicsByUnitService } from "../services";

export async function getTopicsByUnitAction(
    unitId: string
) {
    return getTopicsByUnitService(unitId);
}