"use server";

import { getProgramsService } from "../services/program.service";

export async function getProgramsAction() {
  return await getProgramsService();
}