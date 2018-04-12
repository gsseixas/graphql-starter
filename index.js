const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const schema = buildSchema(`
type Query {
  foo: String
}

type Schema {
  query: Query
}
`);

const videos = [];

const resolvers = {
  video: () => ({
    id: 1,
    title: 'Foo',
    duration: 180,
    watched: true,
  }),
  videos: () => videos,
};

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    resolvers: resolvers,
  }),
);

server.listen(PORT, () => console.log(`Server Listeting on port ${PORT}`));
