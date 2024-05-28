"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  httpLink,
  httpBatchLink,
  splitLink,
  isNonJsonSerializable,
} from "@trpc/client";
import { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { getBaseUrl } from "@/utils";
import { useSession } from "next-auth/react";

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient, setTrpcClient] = useState(() =>
    trpc.createClient({ links: [] })
  );

  useEffect(() => {
    setTrpcClient(() =>
      trpc.createClient({
        links: [
          splitLink({
            condition: (op) => {
              return isNonJsonSerializable(op.input);
            },
            true: httpLink({
              url: `${getBaseUrl()}/api/trpc`,

              // You can pass any HTTP headers you wish here
              headers: () => {
                return {};
              },
            }),

            false: httpBatchLink({
              url: `${getBaseUrl()}/api/trpc`,

              // You can pass any HTTP headers you wish here
              headers: () => {
                if (!!session.data?.user) {
                  return { userId: session.data?.user.id };
                }
                return {};
              },
            }),
          }),
        ],
      })
    );
  }, [session]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
