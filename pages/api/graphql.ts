import type { ApiRequest, ApiResponse } from '@flcn-ecomm/lib/types/api'
import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';


const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

const cors = Cors();


export default cors(async (req: ApiRequest, res: ApiResponse) => {
  if ( req.method === 'OPTIONS' ) {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};