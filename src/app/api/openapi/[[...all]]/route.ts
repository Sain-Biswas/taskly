import "server-only";

import { appRouter } from "@/server/orpc/app.route";
import { createContext } from "@/server/orpc/context.orpc";
import { onError } from "@orpc/client";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import type { NextRequest } from "next/server";

const handler = new OpenAPIHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.log(error);
    }),
  ],
  plugins: [
    new OpenAPIReferencePlugin({
      docsProvider: "scalar", // default: 'scalar'
      schemaConverters: [new ZodToJsonSchemaConverter()],
      specGenerateOptions: {
        info: {
          title: "ORPC Playground",
          version: "1.0.0",
        },
      },
    }),
  ],
});

async function handleRequest(request: NextRequest) {
  console.log("Openapi Handler Called");
  const context = await createContext(request);

  const { response } = await handler.handle(request, {
    prefix: "/api/openapi",
    context,
  });

  return (
    response ??
    new Response(
      JSON.stringify({
        success: false,
        message: "No such Openapi RPC handler found to resolve request.",
      }),
      {
        status: 404,
        statusText: "404 Not Found",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  );
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
