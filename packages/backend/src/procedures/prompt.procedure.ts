import { z } from "zod";
import { PromptService } from "../services";
import { protectedProcedure, router } from "../trpc";
import { PromptCreateInputSchema } from "../models/PromptCreate";


export const promptRouter = router({
  list: protectedProcedure.query(async () => {
    try {
      const prompts = await PromptService.getAllPrompts()
      return prompts
    }
    catch (error) {
      console.error("Fetching Prompt Service Failed")
    }
  }),
  getBySlug: protectedProcedure.input(z.string()).query(async (opts) => {
    try {
      const {input} = opts;
      const prompt = await PromptService.getPromptBySlug(input);
      return prompt
    }
    catch (error) {
      console.error("Fetching Prompt Service Failed")
    }
  }),

  create: protectedProcedure.input(PromptCreateInputSchema).mutation(async (opts) => {
    try{
      const {input} = opts;
      const prompt = await PromptService.create(input);
      return prompt
    }
    catch(error){
      console.error("Prompt Create Failed")
    }
  })
})
