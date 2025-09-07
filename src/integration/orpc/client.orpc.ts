import { env } from "@/constant/environment-variables/client.env";
import type { TAppRouterClient } from "@/server/orpc/app.route";
import { createORPCClient, onError } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

function getServerLink() {
  if (env.NEXT_PUBLIC_NODE_ENV !== "production") {
    return `http://${env.NEXT_PUBLIC_VERCEL_URL}/api/rpc`;
  }
  return `https://${env.NEXT_PUBLIC_VERCEL_URL}/api/rpc`;
}

const orpcLink = new RPCLink({
  url: getServerLink(),
  interceptors: [
    onError((error) => {
      console.log(error);
    }),
  ],
});

export const orpcClient: TAppRouterClient = createORPCClient(orpcLink);

export const orpcTanstackClient = createTanstackQueryUtils(orpcClient);
