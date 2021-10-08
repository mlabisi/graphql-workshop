// LOCAL
// const {ApolloServer, gql} = require("apollo-server");
// SERVERLESS
const {
    ApolloServer,
    gql
} = require("apollo-server-lambda");

const {
    unmarshall
} = require("@aws-sdk/util-dynamodb");
const {
    DynamoDBClient,
    ScanCommand
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
    region: "us-east-1"
});

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
            addresses.push(unmarshall(item));
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
            menuItems.push(unmarshall(item));
        });
        return menuItems;
    } catch (err) {
        console.error(err);
        return err;
    }
};

const hoursItems = [{
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

const shops = [{
        "id": 1,
        "addressId": 1,
        "menuItemIds": [2, 3, 10, 12, 15, 17],
        "hoursId": 1
    },
    {
        "id": 2,
        "addressId": 2,
        "menuItemIds": [1, 3, 4, 5, 6, 7],
        "hoursId": 2
    },
    {
        "id": 3,
        "addressId": 3,
        "menuItemIds": [1, 2],
        "hoursId": 3
    },
    {
        "id": 4,
        "addressId": 4,
        "menuItemIds": [1, 2, 7, 8, 9, 11, 13, 14, 15],
        "hoursId": 1
    },
    {
        "id": 5,
        "addressId": 5,
        "menuItemIds": [11, 14, 16],
        "hoursId": 2
    },
    {
        "id": 6,
        "addressId": 6,
        "menuItemIds": [10, 2, 5, 13],
        "hoursId": 3
    },
    {
        "id": 7,
        "addressId": 7,
        "menuItemIds": [14, 12, 17],
        "hoursId": 1
    },
    {
        "id": 8,
        "addressId": 8,
        "menuItemIds": [1, 5, 4, 8, 11, 15, 14, 16, 17],
        "hoursId": 2
    },
    {
        "id": 9,
        "addressId": 9,
        "menuItemIds": [1, 3, 6, 9, 12, 13, 14, 16, 17],
        "hoursId": 3
    },
    {
        "id": 10,
        "addressId": 10,
        "menuItemIds": [1, 2, 4, 10, 12, 13, 14, 16, 17],
        "hoursId": 1
    }
];

const addresses = [{
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
    {
        "id": 4,
        "streetNumber": "6",
        "streetName": "Weasleys' Wizard Wheezes"
    },
    {
        "id": 5,
        "streetNumber": "43",
        "streetName": "Madam Puddifoot's Tea Shop"
    },
    {
        "id": 6,
        "streetNumber": "333",
        "streetName": "Three Broomsticks"
    },
    {
        "id": 7,
        "streetNumber": "912",
        "streetName": "Hog's Head"
    },
    {
            "id": 8,
            "streetNumber": "12",
            "streetName": "Elm Street"
        },
    {
        "id": 9,
        "streetNumber": "443",
        "streetName": "Steamy Hallows"
    },
    {
        "id": 10,
        "streetNumber": "887",
        "streetName": "Froopyland Juices"
    }
];

const menuItems = [{
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
    {
        "id": 4,
        "name": "Pumpkin Juice",
        "price": 3.65
    },
    {
        "id": 5,
        "name": "Unicorn Elixir",
        "price": 14.00
    },
    {
        "id": 6,
        "name": "Zombie Brains Pour Over",
        "price": 2.30
    },
    {
        "id": 7,
        "name": "Mermaid Legs Potion",
        "price": 9.45
    },
    {
        "id": 8,
        "name": "Zombie Brains Pour Over",
        "price": 2.30
    },
    {
        "id": 10,
        "name": "Bloody Caramel Macchiato",
        "price": 7.40
    },
    {
        "id": 11,
        "name": "Ghoulish Irish Coffee",
        "price": 3.80
    },
    {
        "id": 12,
        "name": "Red Eye Sambuca Coffee",
        "price": 2.30
    },
    {
        "id": 13,
        "name": "Drunken Ghoul Coffee",
        "price": 2.33
    },
    {
        "id": 14,
        "name": "Goblin Snot",
        "price": 3.33
    },
    {
        "id": 15,
        "name": "Hog's Breath",
        "price": 2.33
    },
    {
        "id": 16,
        "name": "Dead Man's Toe",
        "price": 1.01
    },
    {
        "id": 17,
        "name": "Spider Eggs",
        "price": 2.81
    }
];

// resolvers
const resolvers = {
    RootQuery: {
        shops: () => {
            return shops;
        },
        items: () => {
            return menuItems;
            //      return getMenuItems();
        },
        item: (_, {
            name,
            id
        }) => {
            if (name != null && id != null) {
                return menuItems.find(item => {
                    return item.name === name && item.id == id
                });
            } else if (name != null) {
                return menuItems.find(item => {
                    return item.name === name
                });
            } else if (id != null) {
                return menuItems.find(item => {
                    return item.id == id
                });
            }

        },
        shop: (_, {
            id
        }) => {
            if (id != null) {
                return shops.find(shop => {
                    return shop.id == id
                })
            }
        }
    },

    RootMutation: {
        addMenuItem: async (_, {
            name,
            price
        }, {
            dataSources
        }) => {
            // calling data store to save/create item
            // return created object back
            const item = {
                "id": menuItems.length + 1,
                "name": name,
                "price": price
            };
            menuItems.push(item);
            return item;
        },
        addShop: async (_, {
            streetNumber,
            streetName
        }, {
            dataSources
        }) => {
            // create new address
            const newAddress = {
                "id": addresses.length + 1,
                "streetNumber": streetNumber,
                "streetName": streetName
            };
            addresses.push(newAddress);

            const newShop = {
                "id": shops.length + 1,
                "addressId": newAddress.id,
                "menuItemIds": [Math.floor(Math.random() * menuItems.length) + 1, Math.floor(Math.random() * menuItems.length) + 1, Math.floor(Math.random() * menuItems.length) + 1],
                "hoursId": Math.floor(Math.random() * hoursItems.length) + 1
            };
            shops.push(newShop);

            return newShop;
        }
    },

    Shop: {
        address(parent) {
            return addresses.filter(address => address.id === parent.id)[0];
        },
        menu(parent) {
            return menuItems.filter(item => parent.menuItemIds.includes(item.id));
        },
        hours(parent) {
            return hoursItems.filter(item => item.id === parent.hoursId)[0];
        }
    },
    Address: {
        streetNumber(parent) {
            return (Array.isArray(parent) ? parent[0] : parent).streetNumber;
        },
        streetName(parent) {
            return (Array.isArray(parent) ? parent[0] : parent).streetName;
        }
    },
    HoursItem: {
        openTime(parent) {
            return parent.openTime;
        },
        closeTime(parent) {
            return parent.closeTime;
        }
    },
    MenuItem: {
        name(parent) {
            return (Array.isArray(parent) ? parent[0] : parent).name;
        },
        price(parent) {
            return (Array.isArray(parent) ? parent[0] : parent).price;
        }
    }
};

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

// SERVERLESS
const handler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    },
});

exports.graphqlHandler = handler;

// LOCAL
// server.listen().then(({url}) => {
//     console.log(`🚀  Server ready at ${url}`);
// });