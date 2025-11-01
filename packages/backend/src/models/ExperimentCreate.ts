import { z } from "zod";


export const ExperimentCreateSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  prompts: z.array(z.number()),
  interfaces: z.array(z.string()),
  categoryPromptMap: z.record(
    z.array(
      z.object({
        id: z.number(),
        title: z.string(),
      })
    )
  ),
});

export type ExperimentCreate = z.infer< typeof ExperimentCreateSchema>
