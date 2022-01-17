import { PrismaClient } from "@prisma/client"
import prisma from "../lib/prisma"

export interface Context {
  prisma: PrismaClient
}
export async function createContext({ req, res }: any): Promise<Context> {
  return { prisma }
}
