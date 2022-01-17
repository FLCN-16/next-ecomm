import type { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient
  var authToken: string | null
}
