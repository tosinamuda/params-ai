
import prisma from "../config/prisma";
import { ExperimentCreate } from "../models/ExperimentCreate";
import { ExperimentRepository } from "../repositories";

export const getAllExperiments = async () => {
  const experimentRepo = new ExperimentRepository(prisma.experiment);
  const experiments = await experimentRepo.getAll()
  return experiments
}

export const create = async (experimentInput: ExperimentCreate) => {
  const experimentRepo = new ExperimentRepository(prisma.experiment);

  const experiment = await experimentRepo.createExperiment(experimentInput)
  return { experiment }
}


export const getExperimentById = async (id: string | number) => {
  const experimentRepo = new ExperimentRepository(prisma.experiment);
  const experiment = await experimentRepo.geExperimentById(id)
  return experiment
}
