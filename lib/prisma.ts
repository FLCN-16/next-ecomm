import bcrypt from 'bcrypt';
import { PrismaClient, Prisma } from '@prisma/client';
import { timestampToDate } from '../lib/helper/index';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

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

const timestampMiddleware: Prisma.Middleware = async (params: Prisma.MiddlewareParams, next) => {
  console.log(params);
  if ( params.args.data.createdAt ) {
    params.args.data.createdAt = timestampToDate(params.args.data.createdAt);
  }

  if ( params.args.data.updatedAt ) {
    params.args.data.updatedAt = timestampToDate(params.args.data.updatedAt);
  }

  return next(params)
}

/************************ Middlewares **********************/

// Apply Middlewares
prisma.$use(userMiddleware);
prisma.$use(timestampMiddleware);


export default prisma;
