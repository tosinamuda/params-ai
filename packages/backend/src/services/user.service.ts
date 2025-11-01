
import prisma from "../config/prisma";
import { UserCreate } from "../models/UserCreate";
import { UserRepository } from "../repositories";

export const createUser = async (user: UserCreate) => {
  const userRepo = new UserRepository(prisma.user);
  const userCreated = await userRepo.createUser(user);
  return { user: userCreated }
}

export const getUserByEmail = async (email: string) => {
  const user = new UserRepository(prisma.user).getUserByEmail(email)
  return user
}