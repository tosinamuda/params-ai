import { z } from "zod";
import {  ExperimentService } from "../services";
import { protectedProcedure, router } from "../trpc";
import { ExperimentCreateSchema } from "../models/ExperimentCreate";


export const experimentRouter = router({
  list: protectedProcedure.query(async () => {
    try {
      const experiments = await ExperimentService.getAllExperiments()
      return experiments
    }
    catch (error) {
      console.error("Creating Experiment Service Failed")
    }
  }),
  create: protectedProcedure.input(ExperimentCreateSchema).mutation(async (opts) => {
    try{
      const {input} = opts;
      const experiment = await ExperimentService.create(input);
      return experiment
    }
    catch(error){
      console.error("Prompt Create Failed")
    }
  }),
  getById: protectedProcedure.input(z.string()).query(async (opts) => {
    try {
      const {input} = opts;
      const experiment = await ExperimentService.getExperimentById(input)
      return experiment
    }
    catch (error) {
      console.error("Fetching ExperimentByID Service Failed")
    }
  }),
})
