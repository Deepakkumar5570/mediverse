"use server";

import { getProgramsService } from "../services";

export async function getProgramsAction() {
  return getProgramsService();
}