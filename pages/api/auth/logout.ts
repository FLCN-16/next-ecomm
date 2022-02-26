import jwt from "jsonwebtoken"
import type { ApiRequest, ApiResponse } from "../../../lib/types/api"
import withMiddlewares from "../../../lib/middlewares"

const handle = async (req: ApiRequest, res: ApiResponse) => {
  const { token } = req.body

  const decoded = jwt.verify(token, process.env.JWT_SECRET!)

  const response = await req.prisma.session.update({
    data: { isExpired: true },
    where: { sessionToken: decoded.sessionToken },
  })
}

export default withMiddlewares(handle)
