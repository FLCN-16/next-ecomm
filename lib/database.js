const bcrypt = require('bcrypt');
const prismaClient = require('@prisma/client');

const prisma = new prismaClient.PrismaClient();

const middlewares = {
  userObject: async (params, next) => {
    if ( params.model !== 'User' ) return next(params);

    // hash Password
    if ( params.args.data.password ) {
      params.args.data.password = await bcrypt.hash(params.args.data.password, 10);
    }

    return next(params)
  }
}


// Apply Middlewares
for ( let middleware in middlewares ) {
  prisma.$use(middlewares[middleware]);
}


module.exports = prisma;