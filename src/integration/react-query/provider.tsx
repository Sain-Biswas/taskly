"use client";

import { env } from "@/constant/environment-variables/client.env";
import { getQueryClient } from "@/integration/react-query/create-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

export function ReactQueryProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {env.NEXT_PUBLIC_NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
