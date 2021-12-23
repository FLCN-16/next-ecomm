import bcrypt from 'bcrypt';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

/************************ Middlewares **********************/

const userMiddleware: Prisma.Middleware = async (params: Prisma.MiddlewareParams, next) => {
  if ( params.model !== 'User' ) return next(params);

  if ( [ 'create', 'update' ].indexOf( params.action ) === -1 ) return next(params);

  // Lowercase username
  if ( params.args.data.username ) {
    params.args.data.username = params.args.data.username.toLowerCase();
  }

  // Lowercase email
  if ( params.args.data.email ) {
    params.args.data.email = params.args.data.email.toLowerCase();
  }

  // hash Password
  if ( params.args.data.password ) {
    params.args.data.password = await bcrypt.hash(params.args.data.password, 10);
  }

  return next(params)
}

/************************ Middlewares **********************/

// Apply Middlewares
prisma.$use(userMiddleware);


export default prisma;