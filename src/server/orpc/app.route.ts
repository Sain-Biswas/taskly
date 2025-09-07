import "server-only";

import { orpc } from "@/server/orpc/root.orpc";
import { index } from "@/server/orpc/routes/index.route";
import type { RouterClient } from "@orpc/server";

export const appRouter = orpc.prefix("/").router({
  index,
});

export type TAppRouter = typeof appRouter;
export type TAppRouterClient = RouterClient<typeof appRouter>;
