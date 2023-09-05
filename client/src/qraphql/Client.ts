import { GraphQLClient } from 'graphql-request';
const GRAPHQL_API_ENDPOINT = 'http://localhost:5001/graphql'

const client = new GraphQLClient(GRAPHQL_API_ENDPOINT);

export default client;