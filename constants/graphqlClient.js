import { GraphQLClient } from "graphql-request";
const url = "https://tarouca.stepzen.net/api/elder-pronghorn/__graphql";
const client = new GraphQLClient(url, {
  headers: {
    Authorization: "apikey " + process.env.EXPO_PUBLIC_GRAPHQL,
  },
});

export default client;
