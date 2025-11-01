import { z } from "zod";
import { PromptCategoryService } from "../services";
import { protectedProcedure, router } from "../trpc";


export const promptCategoryRouter = router({
  list: protectedProcedure.query(async () => {
    try {
      const interfaces = await PromptCategoryService.listInterface()
      return interfaces
    }
    catch (error) {
      console.error("Fetching List of Interface Failed")
    }
  }),
  create: protectedProcedure.input(z.object({
    name: z.string().min(2)
  })).mutation(async ({ input }) => {
    try {
      const { name } = input
      const interfaceType = await PromptCategoryService.createInterface(name)
      return interfaceType
    }
    catch (error) {
      console.error("Fetching List of Interface Failed")
    }
  }),
  getById: protectedProcedure.input(z.number()).query(async ({ input }) => {
    try {
      const interfaceType = PromptCategoryService.getInterfaceById(input)
      return interfaceType
    }
    catch (error) {
      console.error("Fetching Interface By ID")
    }
  }),
  getByName: protectedProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const interfaceType = PromptCategoryService.getInterfaceByName(input)
      return interfaceType
    }
    catch (error) {
      console.error("Fetching Interface By ID")
    }
  }),
  listPrompt: protectedProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const prompts = PromptCategoryService.listPrompts(input)
      return prompts
    }
    catch (error) {
      console.error("Fetching List of Interface Failed")
    }
  }),
})
