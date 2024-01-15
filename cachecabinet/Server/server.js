const express = require('express');
const path = require('path');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    await authMiddleware({ req });
    return { user: req.user };
  },
});

const app = express();

const startApolloServer = async () => {
  // start the server
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // apply graphql for route handling
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    }),
  );

  app.get('/amiup', (req, res) => {
    // Send the response with the specified HTML content
    res.send('<h1>I am up!</h1><br/><h3>Thanks for checking on me.<h3/>');
  });

  if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(``);
    });
  });
};

startApolloServer();

