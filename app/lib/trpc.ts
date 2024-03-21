import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "~/.server/trpc/router";

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:5173/trpc",
      // Do not forget to add your "fetch" and "headers" configuration here
    }),
  ],
});
