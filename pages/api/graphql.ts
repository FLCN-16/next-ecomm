import { ApolloServer } from "apollo-server-micro"

import type { ApiRequest, ApiResponse } from "../../lib/types/api"
import { schema } from "../../graphql/schema"
import { resolvers } from "../../graphql/resolvers"
import { createContext } from "../../graphql/context"

const apolloServer = new ApolloServer({
  schema,
  resolvers,
  context: createContext,
  debug: true,
  introspection: true,
})
const startServer = apolloServer.start()

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req: ApiRequest, res: ApiResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  if (req.method === "OPTIONS") {
    res.end()
    return false
  }

  await startServer

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res)
}

export default handler
