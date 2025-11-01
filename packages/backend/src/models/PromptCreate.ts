import { z } from 'zod';

export const PromptCreateInputSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional(),
  publish_status: z.boolean(),
  authorId: z.number(),
  categoryId: z.number(),
});

export const PromptCreateSchema = PromptCreateInputSchema.extend({
  slug: z.string(),
});

export type PromptCreateInput = z.infer<typeof PromptCreateInputSchema>;
export type PromptCreate = z.infer<typeof PromptCreateSchema>;
