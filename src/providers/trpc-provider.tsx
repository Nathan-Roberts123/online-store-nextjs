"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  httpLink,
  httpBatchLink,
  splitLink,
  isNonJsonSerializable,
} from "@trpc/client";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { getBaseUrl } from "@/utils";

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        splitLink({
          condition: (op) => {
            return isNonJsonSerializable(op.input);
          },
          true: httpLink({
            url: `${getBaseUrl()}/api/trpc`,

            // You can pass any HTTP headers you wish here
            async headers() {
              return {};
            },
          }),

          false: httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
          }),
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
