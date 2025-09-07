import { auth } from "@/server/auth/server.auth";
import { database } from "@/server/database/index.database";
import type { NextRequest } from "next/server";

export async function createContext(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  return {
    session,
    headers: request.headers,
    database,
  };
}

export type ORPCContext = Awaited<ReturnType<typeof createContext>>;
