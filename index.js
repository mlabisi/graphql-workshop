const fs = require('fs')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')


// to deploy locally:
const {
    ApolloServer
} = require("apollo-server");


// ///*
// // to deploy remotely via serverless:
// const {
//     ApolloServer,
//     gql
// } = require("apollo-server-lambda");
// //*/

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: "/dev/graphql",
        settings: {
            'editor.theme': 'light',
        }
    },
    introspection: true,
});

// ///*
// // to deploy remotely:
// const handler = server.createHandler({
//     cors: {
//         origin: '*',
//         credentials: true,
//     },
// });

// exports.graphqlHandler = handler;
// //*/



// to deploy locally:
server
  .listen({
    port: process.env.PORT ?? 4000,
    host: process.env.HOST ?? '0.0.0.0',
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
