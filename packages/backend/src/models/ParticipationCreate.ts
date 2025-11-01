import { TaskStatus, Participation } from "@prisma/client";

export type TaskGroupCreate = {
  userId: number;
  experimentId: number;
  prompts: number[];
}

export type TaskCreate = {
  promptId : number;
}



export type ParticipationCreate  = Omit<Participation, "id" | "timeEnded" | "status" | "createdAt" | "updatedAt"> & {
  updatedAt?: Date;
}
