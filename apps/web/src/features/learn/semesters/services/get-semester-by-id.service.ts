import { getSemesterByIdRepository } from "../repositories";

export async function getSemesterByIdService(
    id: string
) {
    return getSemesterByIdRepository(id);
}