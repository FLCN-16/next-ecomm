import type { ApiRequest, ApiResponse } from "../../lib/types/api"
import withMiddlewares from "../../lib/middlewares"

const handle = (req: ApiRequest, res: ApiResponse) => {
  res.status(200).json({ name: "John Doe" })
}

export default withMiddlewares(handle, {
  needAuth: true,
  capabilities: ["admin"],
})
