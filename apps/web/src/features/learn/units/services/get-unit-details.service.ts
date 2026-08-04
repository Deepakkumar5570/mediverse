import { getUnitDetailsRepository } from "../repositories";

export async function getUnitDetailsService(
    unitId: string
) {
    const result =
        await getUnitDetailsRepository(unitId);

    if (!result) {
        throw new Error("Unit not found");
    }

    return result;
}