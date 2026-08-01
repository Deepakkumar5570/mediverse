import { asc } from "drizzle-orm";

import {
  db,
  programs,
} from "@mediverse/database";

export async function getProgramsRepository() {
  return db
    .select()
    .from(programs)
    .orderBy(asc(programs.name));
}