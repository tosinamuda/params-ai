
import prisma from "../config/prisma";
import { ExperimentRepository, InterfaceRepository, ParticipationRepository } from "../repositories";
import { generateParticipationCreates } from "../utils";

export const list = async (userId?: number, experimentId?: number) => {
  const taskRepo = new ParticipationRepository(prisma.participation);
  const tasks = await taskRepo.list({ participantId: userId, experimentId })
  return tasks
}


export const createBulk = async (participantId: number, experimentId: number) => {

  const experiment = await new ExperimentRepository(prisma.experiment).geExperimentById(experimentId);

  if (experiment) {
    const interfaceNames = experiment.interfaces;

    const interfaceTypes = await new InterfaceRepository(prisma.interfaceType).getByNames(interfaceNames);

    if (interfaceTypes.length == interfaceNames.length) {
      const interfaceTypeIds = interfaceTypes.map(it => it.id);

      const promptIds = experiment.prompts;

      const participations = generateParticipationCreates({
        promptIds,
        interfaceTypeIds,
        participantId,
        experimentId
      })

      const taskRepo = new ParticipationRepository(prisma.participation);

      const tasks = await prisma.$transaction(taskRepo.createBulk(participations))

      return tasks;

    }
    else {
      throw new Error('One or more InterfaceTypes not found');
    }

  }
  else {
    throw new Error('Experiment not found');
  }
}


