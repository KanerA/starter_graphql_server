import { ApolloServer } from "@apollo/server";
import express from "express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

//------- add for subscriptions
import cors from "cors";
import { json } from "body-parser";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
//-------

const app = express();
const httpServer = createServer(app);

// -------- For subscriptions

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const schema = makeExecutableSchema({ typeDefs, resolvers }); // for subscriptions
useServer({ schema }, wsServer); // without this line the subscriptions seems to not work
// probably, the useServer function has side effects.
// --------

const startApolloServer = async () => {
  const server = new ApolloServer({
    schema,
    // typeDefs,
    // resolvers,
  });

  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server)
  );

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });

  // without subscriptions
  // const { url } = await startStandaloneServer(server, {
  //   listen: { port: PORT },
  // });
};

startApolloServer();
