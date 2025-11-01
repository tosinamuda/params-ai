import { experimentRouter, inferenceRouter, interfaceRouter, participationRouter, promptCategoryRouter, promptRouter, userRouter } from "../procedures";
import { router } from "../trpc";


export const appRouter = router({
  prompt: promptRouter,
  user: userRouter,
  inference: inferenceRouter,
  experiment: experimentRouter,
  task: participationRouter,
  interface: interfaceRouter,
  promptCategory: promptCategoryRouter
});

// Export type router type signature, this is used by the client.
export type AppRouter = typeof appRouter;
