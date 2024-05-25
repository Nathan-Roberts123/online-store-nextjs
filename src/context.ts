import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const user = { id: req.headers.get("userId") ?? "anonymous" };
  return { req, resHeaders, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
