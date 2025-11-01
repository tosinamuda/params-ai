import { z } from "zod";
import { InterfaceService } from "../services";
import { protectedProcedure, router } from "../trpc";


export const interfaceRouter = router({
  list: protectedProcedure.query(async () => {
    try {
      const interfaces = await InterfaceService.listInterface()
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
      const interfaceType = await InterfaceService.createInterface(name)
      return interfaceType
    }
    catch (error) {
      console.error("Fetching List of Interface Failed")
    }
  }),
  getById: protectedProcedure.input(z.number()).query(async ({ input }) => {
    try {
      const interfaceType = InterfaceService.getInterfaceById(input)
      return interfaceType
    }
    catch (error) {
      console.error("Fetching Interface By ID")
    }
  }),
  getByName: protectedProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const interfaceType = InterfaceService.getInterfaceByName(input)
      return interfaceType
    }
    catch (error) {
      console.error("Fetching Interface By ID")
    }
  }),
})
