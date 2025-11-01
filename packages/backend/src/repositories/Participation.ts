import { Participation, Prisma, PrismaPromise } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ParticipationCreate } from "../models/ParticipationCreate";

type Cursor = {
  id: number
}

type TaskQueryCondition = {
  participantId: number,
  experimentId: number,
  interfaceTypeId: number,
  promptId: number
}

type ListQueryParam = { limit?: number, cursor?: Cursor } & Partial<TaskQueryCondition>;

class ParticipationRepository {
  taskGroup: Prisma.ParticipationDelegate<DefaultArgs>
  constructor(taskGroup: Prisma.ParticipationDelegate<DefaultArgs>) {
    this.taskGroup = taskGroup;
  }


  list({ limit = 10, cursor, participantId, experimentId, interfaceTypeId, promptId }: ListQueryParam) {
    const where: Partial<TaskQueryCondition> = {}
    if (participantId) where.participantId = participantId
    if (experimentId) where.experimentId = experimentId
    if (interfaceTypeId) where.interfaceTypeId = interfaceTypeId
    if (promptId) where.promptId = promptId
    return this.taskGroup.findMany({
      where,
      take: limit,
      cursor,
      orderBy: {
        id: 'desc',
      },
    })
  }

  getPromptById(id: string | number) {
    return this.taskGroup.findUnique({
      where: {
        id: Number(id)
      }
    })

  }


  create(participation: ParticipationCreate) {
    return this.taskGroup.create({
      data: {
        participantId: participation.participantId,
        experimentId: participation.experimentId,
        interfaceTypeId: participation.interfaceTypeId,
        promptId: participation.promptId,
        updatedAt: new Date(),
        timeStarted: new Date()
      }
    })
  }

  createBulk(participations: ParticipationCreate[]) {

    //TODO:  shuffleArray - const prompts = shuffleArray(task.prompts);

    const transactions: PrismaPromise<Participation>[] = [];

    for (const participation of participations) {
      transactions.push(this.create(participation));
    }

    return transactions;
  }
}


export default ParticipationRepository;
