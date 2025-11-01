
import prisma from "../config/prisma";
import { PromptCreate, PromptCreateInput } from "../models/PromptCreate";
import { PromptRepository } from "../repositories";
import { createUniqueSlug } from "../utils";

export const getAllPrompts = async () => {
  const promptRepo = new PromptRepository(prisma.prompt);
  const prompts = await promptRepo.getAll()
  return { prompt: prompts }
}

export const getPromptBySlug = async (slug: string) => {
  const promptRepo = new PromptRepository(prisma.prompt);
  const prompt = await promptRepo.getPromptBySlug(slug)
  return { prompt }
}

export const create = async (prompt: PromptCreateInput) => {
  const promptRepo = new PromptRepository(prisma.prompt);
  const slug = createUniqueSlug(prompt.title)
  const promptCreated = await promptRepo.createPrompt({...prompt, slug})
  return { prompt: promptCreated }
}

