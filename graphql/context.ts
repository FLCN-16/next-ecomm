import { User, CapabilitiesOnRole, PrismaClient } from "@prisma/client"
import type { JwtPayload } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma"

export interface Context {
  prisma: PrismaClient
  user: User | null
  capabilities: CapabilitiesOnRole[]
}
export async function createContext({ req }: any): Promise<Context> {
  // Get the user token from the headers.
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null

  let user = null
  if (token) {
    let tokenDecoded: JwtPayload
    try {
      tokenDecoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
      if (tokenDecoded) {
        user = await prisma.user.findUnique({
          include: {
            user_role: {
              include: { capabilities: true },
            },
          },
          where: { ID: tokenDecoded.ID },
        })
      }
    } catch (error) {}
  }

  return { prisma, user, capabilities: user?.user_role?.capabilities || [] }
}
