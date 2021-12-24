import type { ApiRequest, ApiResponse } from '@flcn-ecomm/lib/types/api'
import { PrismaClient } from '@prisma/client';


export default () => async (
  req: ApiRequest, res: ApiResponse,
  result: (req: ApiRequest, res: ApiResponse) => object
) => {
  const prisma = new PrismaClient();

  req.prisma = prisma;

  result(req, res);
}