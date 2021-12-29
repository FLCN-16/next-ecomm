import type { ApiRequest, ApiResponse, User } from '@flcn-ecomm/lib/types/api'
import intersection from 'lodash/intersection'
import jwt from 'jsonwebtoken'


const authMiddleware = (capabilities: string[]) => async (
  req: ApiRequest, res: ApiResponse,
  callback: (result: Error | string) => void
) => {
  if (!req.headers.authorization) return callback(new Error('No authorization header'));

  const token = req.headers.authorization.split(' ')[1];
  if (!token) return callback(new Error('No token provided'));

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as User;
    if (!req.user) return callback(new Error('Failed to authenticate token'));

    const userCapabilities = intersection(req.user.capabilities, capabilities);
    if (userCapabilities.length === 0) return callback(new Error('You don\'t have the required capability'));

    return callback('OK');
  } catch (error) {
    return callback(new Error('Failed to authenticate token'));
  }
}

export default authMiddleware