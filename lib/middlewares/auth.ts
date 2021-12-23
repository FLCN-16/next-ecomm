import type { ApiRequest, ApiResponse } from '@flcn-ecomm/lib/types/api'
import intersection from 'lodash/intersection'
import jwt from 'jsonwebtoken'


export default (capabilities: string[]) => async (
  req: ApiRequest, res: ApiResponse,
  result: (req: ApiRequest, res: ApiResponse) => object
) => {
  if (!req.headers.authorization) return result(req, res);

  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).json({ status: false, message: 'No token provided' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    if (!req.user) {
      return res.status(403).json({ status: false, message: 'Failed to authenticate token' });
    }

    const userCapabilities = intersection(req.user.capabilities, capabilities);
    if (userCapabilities.length === 0) {
      return res.status(403).json({ status: false, message: 'You do not have the required capability' });
    }

    return result(req, res);
  } catch (error) {
    return res.status(403).json({ status: false, message: 'Failed to authenticate token' });
  }
}