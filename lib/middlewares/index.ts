import type { ApiRequest, ApiResponse } from '@flcn-ecomm/lib/types/api'

// Middlewares
import prismaMiddleware from './prisma'
import authMiddleware from './auth'

export type MiddlewareOptions = {
  needAuth: boolean,
  capabilities: string[],
}
export type CallBack = (response: any) => void

export const defaultOptions = {
  needAuth: false,
  capabilities: [],
}

export default (next: any, options: MiddlewareOptions = defaultOptions) => async (req: ApiRequest, res: ApiResponse) => {
  try {
    const middlewares = [
      prismaMiddleware(),
      authMiddleware(options.capabilities),
    ].filter(Boolean);

    // each middleware will then be wrapped within its own promise
    const promises = middlewares.map(middleware => {
      const promise = new Promise((resolve, reject) => {
        middleware(req, res, result =>
          result instanceof Error ? reject(result) : resolve(result),
        );
      });
      return promise;
    });

    await Promise.all(promises);

    return next(req, res);
  } catch(error) {
    // if any middleware fails, throws a 400 error
    return res.status(400).send(error);
  }
}