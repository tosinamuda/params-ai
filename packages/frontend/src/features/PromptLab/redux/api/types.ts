import { z } from "zod";

export type PromptInput = {
  prompt: string
}



export const validationSchema = z.object({
  course_of_study: z.string().min(2, { message: "Type at least 2 Characters" }).default("Accounting"),
  career_interest: z.string().optional().default("None"),
  limit: z.coerce.number().positive().optional().default(3)
})

export type ValidationSchema = z.infer<typeof validationSchema>;
