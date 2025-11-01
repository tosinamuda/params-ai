import { z } from "zod";
import { ParticipationService } from "../services";
import { protectedProcedure, router } from "../trpc";


export const participationRouter = router({
  list: protectedProcedure.input(z.object({
    userId: z.coerce.number().optional(),
    experimentId: z.coerce.number().optional()
  })).query(async ({ input }) => {
    try {
      const { userId, experimentId } = input
      const tasks = await ParticipationService.list(userId, experimentId)
      return tasks
    }
    catch (error) {
      console.error("Fetching Prompt Service Failed")
    }
  }),
  createBulk:  protectedProcedure.input(z.object({
    userId: z.coerce.number(),
    experimentId: z.coerce.number()
  })).mutation(async ({ input }) => {
    try {
      const { userId, experimentId } = input
      const tasks = await ParticipationService.createBulk(userId, experimentId)
      return tasks
    }
    catch (error) {
      console.error("Fetching Prompt Service Failed")
    }
  }),
})
