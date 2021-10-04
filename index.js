// needed to deploy locally
//const { ApolloServer, gql } = require("apollo-server");
const { ApolloServer, gql } = require("apollo-server-lambda");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });

const fs = require('fs')
const typeDefs = fs.readFileSync("./schema.gql").toString("utf-8");

const getAddresses = async () => {
    const params = {
        TableName: "addresses",
    };

    try {
          const results = await client.send(new ScanCommand(params));
          const addresses = [];
          results.Items.forEach((item) => {
            books.push(unmarshall(item));
          });
          return addresses;
        } catch (err) {
          console.error(err);
          return err;
        }
      };

const getMenuItems = async () => {
    const params = {
        TableName: "menuItems",
    };

    try {
          const results = await client.send(new ScanCommand(params));
          const menuItems = [];
          results.Items.forEach((item) => {
            books.push(unmarshall(item));
          });
          return menuItems;
        } catch (err) {
          console.error(err);
          return err;
        }
      };

const hoursItems = [
    {
        "id": 1,
        "openTime": "9 AM",
        "closeTime": "8 PM"
    },
    {
        "id": 2,
        "openTime": "6 AM",
        "closeTime": "9 PM"
    },
    {
        "id": 3,
        "openTime": "7 AM",
        "closeTime": "4 PM"
    }
];

const shops = [
    {
        "id": 1,
        "addressId": 1,
        "menuItemIds": [2, 3],
        "hoursIds": 1
    },
    {
        "id": 2,
        "addressId": 2,
        "menuItemIds": [1, 3],
        "hoursIds": 2
    },
    {
        "id": 3,
        "addressId": 3,
        "menuItemIds": [1, 2],
        "hoursIds": 3
    }
];

const addresses = [
    {
        "id": 1,
        "streetNumber": "123",
        "streetName": "Java Way"
    },
    {
        "id": 2,
        "streetNumber": "456",
        "streetName": "Mocha Ave"
    },
    {
        "id": 3,
        "streetNumber": "789",
        "streetName": "Machiatto Lane"
    },
];

const menuItems = [
    {
        "id": 1,
        "name": "Peppermint Latte",
        "price": 3.00
    },
    {
        "id": 2,
        "name": "Matcha Latte",
        "price": 6.00
    },
    {
        "id": 3,
        "name": "Vanilla Latte",
        "price": 4.00
    },
];

// resolvers
const resolvers = {
  RootQuery: {
    shops: () => {
        return shops;
//      return getAddresses();
    },
    items: () => {
        return menuItems;
//      return getMenuItems();
    },
  },
};

// todo: switch playground to graphiql
const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
            endpoint: "/dev/graphql",
    },
    introspection: true,
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