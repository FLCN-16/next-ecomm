import { PrismaClient } from "@prisma/client"
import type { ApiRequest, ApiResponse } from "../../lib/types/api"

const prismaMiddleware = () => async (req: ApiRequest, res: ApiResponse, callback: (result?: Error | string) => void) => {
  const prisma = new PrismaClient()

  req.prisma = prisma

  callback()
}

export default prismaMiddleware
