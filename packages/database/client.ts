import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const globalForPostgres = globalThis as unknown as {
  postgresClient: ReturnType<typeof postgres> | undefined;
};

const client =
  globalForPostgres.postgresClient ??
  postgres(process.env.DATABASE_URL!, {
    prepare: false,

    // Keep the number of database connections low.
    // This is especially important during Next.js builds
    // where multiple workers can load the database package.
    max: 1,

    // Close idle connections after 20 seconds.
    idle_timeout: 20,

    // Fail fast if PostgreSQL cannot be reached.
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPostgres.postgresClient = client;
}

export const db = drizzle(client);