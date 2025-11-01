
import prisma from "../config/prisma";
import { InterfaceRepository } from "../repositories";

export const listInterface = async () => {
  const interfaces = new InterfaceRepository(prisma.interfaceType).list();
  return interfaces
}

export const createInterface = async (name: string) => {
  const interfaceType = new InterfaceRepository(prisma.interfaceType).create(name)
  return interfaceType
}

export const getInterfaceByName = async (name: string) => {
  const interfaceType = new InterfaceRepository(prisma.interfaceType).getByName(name)
  return interfaceType
}

export const getInterfaceById = async (id: number) => {
  const interfaceType = new InterfaceRepository(prisma.interfaceType).getByID(id)
  return interfaceType
}

