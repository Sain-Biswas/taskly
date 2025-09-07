import "server-only";

import { auth } from "@/server/auth/server.auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth.handler);
