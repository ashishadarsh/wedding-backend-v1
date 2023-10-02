import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { authMiddleware, handleLogin, handleSignUp } from './auth.js';
import { resolvers } from './resolvers.js';

const PORT = 9000;
const app = express();

app.use(cors());
app.use(express.json(),authMiddleware); // Parse JSON request bodies

app.post('/login', authMiddleware, handleLogin);
app.post('/signup', handleSignUp);

const typeDefs = await readFile('./schema.graphql', 'utf8');

function getContext({ req }) {
        return { auth: req.auth };
}

const apolloServer = new ApolloServer({ typeDefs, resolvers });


await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext }));

app.listen({ port: PORT }, () => {
    console.log(`server running at ${PORT}`);
    console.log(`graphql running at ${PORT}/graphql`);
});
