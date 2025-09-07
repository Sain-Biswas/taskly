import "server-only";

import { appRouter } from "@/server/orpc/app.route";
import { createContext } from "@/server/orpc/context.orpc";
import { RPCHandler } from "@orpc/server/fetch";
import type { NextRequest } from "next/server";

const handler = new RPCHandler(appRouter);

async function rpcRequestHandler(request: NextRequest) {
  const context = await createContext(request);

  const { response } = await handler.handle(request, {
    prefix: "/api/rpc",
    context,
  });

  return (
    response ??
    new Response(
      JSON.stringify({
        success: false,
        message: "No such RPC handler found to resolve request.",
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

export const HEAD = rpcRequestHandler;
export const GET = rpcRequestHandler;
export const POST = rpcRequestHandler;
export const PUT = rpcRequestHandler;
export const PATCH = rpcRequestHandler;
export const DELETE = rpcRequestHandler;
