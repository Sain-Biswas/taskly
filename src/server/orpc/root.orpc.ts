import type { ORPCContext } from "@/server/orpc/context.orpc";
import { ORPCError, os } from "@orpc/server";

export const orpc = os.$context<ORPCContext>().$route({
  inputStructure: "compact",
  outputStructure: "compact",
});

export const publicProcedure = orpc;

const requireAuthMiddleware = orpc.middleware(async ({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Authentication is needed to access this api route.",
    });
  }

  return next({
    context: {
      session: context.session,
      headers: context.headers,
      database: context.database,
    },
  });
});

export const protectedProcedure = publicProcedure.use(requireAuthMiddleware);
