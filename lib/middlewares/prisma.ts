import type { ApiRequest, ApiResponse } from '@flcn-ecomm/lib/types/api'
import { PrismaClient } from '@prisma/client';


const prismaMiddleware = () => async (
  req: ApiRequest, res: ApiResponse,
  callback: (result?: Error | string) => void
) => {
  const prisma = new PrismaClient();

  req.prisma = prisma;

  callback()
}

export default prismaMiddleware;