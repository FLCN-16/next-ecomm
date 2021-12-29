import { ApolloClient, InMemoryCache } from '@apollo/client';
export { gql } from '@apollo/client'

let graphql: ApolloClient = new ApolloClient({
    uri: process.env.GRAPHQL_API || '/api/graphql',
    cache: new InMemoryCache()
});

export default graphql;