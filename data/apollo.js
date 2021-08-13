import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost/tutorial/graphql",
  cache: new InMemoryCache(),
});
