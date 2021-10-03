// needed to deploy locally
//const { ApolloServer, gql } = require("apollo-server");
const { ApolloServer, gql } = require("apollo-server-lambda");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });

const getBooks = async () => {
  const params = {
    TableName: "books",
  };

const get

  try {
    const results = await client.send(new ScanCommand(params));
    const books = [];
    results.Items.forEach((item) => {
      books.push(unmarshall(item));
    });
    return books;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// schema
const typeDefs = gql`
  scalar JSON
  type Book {
    id: ID!
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

// resolvers
const resolvers = {
  Query: {
    books: () => {
      return getBooks();
    },
  },
};

// todo: switch playground to graphiql
const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
            endpoint: "/dev/graphql",
    }
});

const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});

exports.graphqlHandler = handler;

// to deploy locally
//const server = new ApolloServer({
//  typeDefs,
//  resolvers,
//});
//
//server.listen().then(({ url }) => {
//  console.log(`🚀  Server ready at ${url}`);
//});