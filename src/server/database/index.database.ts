import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { env } from "@/constant/environment-variables/server.env";
import * as schema from "@/server/database/index.schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

/**
 * Generating a node postgres driver.
 */
const conn =
  globalForDb.conn ??
  new Pool({
    connectionString: env.DATABASE_URL,
  });

/**
 * Cache the database connection if creating for the first time.
 */
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

/**
 * Drizzle database connection object for accessing postgres database from the whole application.
 */
export const database = drizzle({ client: conn, schema });
