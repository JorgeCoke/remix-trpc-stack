import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  welcome: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
      })
    )
    .query(async ({ input, ctx }) => {
      console.log(`Server side log context: `, ctx.session);
      return { message: `Welcome ${input.name} (query)` };
    }),
  hello: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log(`Server side log context: `, ctx.session);
      return { message: `Hello ${input.name} (mutation)` };
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
