import { z } from "zod";
import { UserCreate } from "../models/UserCreate";
import { PromptService, UserService } from "../services";
import { protectedProcedure, publicProcedure, router } from "../trpc";
export const userRouter = router({
  list: publicProcedure.query(async () => {
    try {
      const prompts = await PromptService.getAllPrompts()
      return prompts
    }
    catch (error) {
      console.error("Fetching Prompt Service Failed")
    }
  }),
  create: publicProcedure.input(z.object({
    uid: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    displayName: z.string(),
    isAnonymous: z.boolean(),
    photoURL: z.string(),
    createdAt: z.string(),
    lastLoginAt: z.string(),
  })).mutation(async ({ input }) => {

    try {
      const user = input as UserCreate
      // VerifyToken Middleware
      const result = await UserService.createUser(user)
      return result;
    }
    catch (error) {
      console.error("Creating User Failed")
    }
  }),
  getByEmail: protectedProcedure.input(z.object({ email: z.string().email() }))
  .query(async ({ input }) => {
    try {
      const {email} = input
      const user = await UserService.getUserByEmail(email);
      return user
    } catch (error) {
      console.error("Fetching User By Email Failed")
    }
  })
})
