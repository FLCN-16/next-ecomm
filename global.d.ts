import type { PrismaClient } from "@prisma/client"

declare global {
  let prisma: PrismaClient
  let authToken: string | null
}
