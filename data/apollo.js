import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:8888/wordpress2/graphql", // Your WordPress URL + graphql
  cache: new InMemoryCache(),
});
