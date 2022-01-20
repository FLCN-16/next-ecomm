import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, NormalizedCacheObject } from "@apollo/client"

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_API || "/api/graphql",
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: global.authToken || null,
    },
  }))

  return forward(operation)
})

const graphql: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    addTypename: false
  }),
})

// Exports
export { gql } from "@apollo/client"

export default graphql
