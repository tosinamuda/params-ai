import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ExperimentCreate } from "../models/ExperimentCreate";

type Cursor = {
  id: number
}
class ExperimentRepository {
  experiment: Prisma.ExperimentDelegate<DefaultArgs>
  constructor(experiment: Prisma.ExperimentDelegate<DefaultArgs>) {
    this.experiment = experiment;
  }


  getAll(limit: number = 10, cursor?: Cursor) {
    return this.experiment.findMany({
      take: limit,
      cursor,
      orderBy: {
        id: 'desc',
      },
    })
  }


  geExperimentById(id: string | number) {
    return this.experiment.findUnique({
      where: {
        id: Number(id)
      }
    })
  }



  createExperiment(experiment: ExperimentCreate) {
    return this.experiment.create({
      data: {
        ...experiment
      }
    })
  }
}

export default ExperimentRepository;
