import type { ApiRequest, ApiResponse } from '@flcn-ecomm/lib/types/api'
import withMiddlewares from '@flcn-ecomm/lib/middlewares'


const handle = (req: ApiRequest, res: ApiResponse) => {
  res.status(200).json({ name: 'John Doe' })
}

export default withMiddlewares(handle, { needAuth: true, capabilities: ['admin'] })