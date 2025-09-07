import { orpc, publicProcedure } from "@/server/orpc/root.orpc";
import { z } from "zod";

export const index = orpc.prefix("/").router({
  healthCheck: publicProcedure
    .route({
      description:
        "This is an endpoint for the purpose of verifying whether the rpc server is up or not.",
      summary: "Up Status Check",
      method: "GET",
      path: "/health-check",
      tags: ["System"],
      successStatus: 200,
      successDescription: "The server is up and running.",
    })
    .output(
      z.object({
        status: z.boolean(),
        message: z.string(),
      })
    )
    .handler(() => ({
      status: true,
      message: "The server is up and running.",
    })),
});
