import { TRPCError, initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";

/**
 * Your context holds data that all of your tRPC procedures will have access to,
 * and is a great place to put things like database connections or authentication information.
 * Setting up the context is done in 2 steps, defining the type during initialization
 * and then creating the runtime context for each request.
 */
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  // const user = opts.req.headers.get('Auhtorization')...
  const session = { id: "dummyId" };
  return {
    session,
    // db
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

/**
 * You are able to add middleware(s) to a procedure with the t.procedure.use() method.
 * The middleware(s) will wrap the invocation of the procedure and must pass through its return value.
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next();
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const isAuthedProcedure = publicProcedure.use(isAuthed);
