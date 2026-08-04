import { getTopicsByUnitRepository } from "../repositories";

export async function getTopicsByUnitService(
    unitId: string
) {
    return getTopicsByUnitRepository(unitId);
}