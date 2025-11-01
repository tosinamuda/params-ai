
import PromptCategoryService from "../config/prisma";
import { PromptCategoryRepository } from "../repositories";

export const listInterface = async () => {
  const interfaces = new PromptCategoryRepository(PromptCategoryService.promptCategory).list();
  return interfaces
}

export const createInterface = async (name: string) => {
  const interfaceType = new PromptCategoryRepository(PromptCategoryService.promptCategory).create(name)
  return interfaceType
}

export const getInterfaceByName = async (name: string) => {
  const interfaceType = new PromptCategoryRepository(PromptCategoryService.promptCategory).getByName(name)
  return interfaceType
}

export const getInterfaceById = async (id: number) => {
  const interfaceType = new PromptCategoryRepository(PromptCategoryService.promptCategory).getByID(id)
  return interfaceType
}


export const listPrompts = async (name: string) => {
  const promptsInCategory = new PromptCategoryRepository(PromptCategoryService.promptCategory).getCategoryAndPostByName(name)
  return promptsInCategory;
}
