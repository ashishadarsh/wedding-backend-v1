// server.js
import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";

import cors from 'cors';
import express from 'express';

import { readFile } from 'node:fs/promises';
import { resolvers } from './resolvers.js';

const PORT = 9000;

const app = express();
app.use(cors(), express.json());

let apolloServer;

async function initApolloServer() {
  const typeDefs = await readFile('./schema.graphql', 'utf8');
  apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  app.use('/graphql', apolloMiddleware(apolloServer));
}

initApolloServer();

const server = app.listen({ port: PORT }, () => {
  console.log(`server running at ${PORT}`);
  console.log(`graphql running at ${PORT}/graphql`);
});

const init = async () => {
    await initApolloServer();
  };
  
  export { server, apolloServer, init };
