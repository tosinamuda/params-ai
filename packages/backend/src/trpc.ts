import { TRPCError, initTRPC } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';
import { FirebaseMiddleware } from "./middleware";

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const user = await FirebaseMiddleware.verifyToken(req.headers.authorization.split(' ')[1]);
      return user;
    }
    return null;
  }
  const user = await getUserFromHeader();
  return {
    user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;

// you can reuse this for any procedure
export const protectedProcedure = t.procedure.use(async function isAuthed(
  opts,
) {
  const { ctx } = opts;
  // `ctx.user` is nullable
  if (!ctx.user) {
    //     ^?
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next({
    ctx: {
      // ✅ user value is known to be non-null now
      user: ctx.user,
      // ^?
    },
  });
});
