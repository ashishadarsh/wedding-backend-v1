// server.test.js
import { expect } from 'chai';
import supertest from 'supertest';
import { before, after, it } from 'mocha';

const PORT = 9000;
const BASE_URL = `http://localhost:${PORT}`;

import { server, apolloServer, init } from './server.js';

before(async () => {
  await init();
  console.log('Apollo Server initialized:', apolloServer);
});

after(async () => {
  // Close the Apollo Server
  await apolloServer?.stop();

  // Close the Express server after all tests
  server.close(() => {
    console.log('Server closed');
  });
});


it('should expose GraphQL endpoint at /graphql', async () => {
  const response = await supertest(server).get('/graphql');
  console.log('Response:', response.body);
  expect(response.status).to.equal(400);
  // Add more assertions based on your GraphQL server setup

  // Example:
  // expect(response.body).to.have.property('data');
  // expect(response.body.data).to.have.property('yourQueryOrMutation');
});

// Add more tests as needed
