const {
    shopOwners,
    shops,
    addresses,
    menuItems,
    hoursItems
} = require("./data");
const fs = require('fs')
const typeDefs = fs.readFileSync("./schema.gql").toString("utf-8");

/*
// to deploy locally:
const {
    ApolloServer,
    gql
} = require("apollo-server");
*/

///*
// to deploy remotely via serverless:
const {
    ApolloServer,
    gql
} = require("apollo-server-lambda");
//*/

// resolvers
const resolvers = {
    RootQuery: {
        shops: () => {
            return shops;
        },
        items: () => {
            return menuItems;
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
        shopOwners: () => {
            return shopOwners;
        },
        shopOwner: (_, {
            firstName,
            id
        }) => {
            if (id != null) {
                return shopOwners.find(owner => {
                    return owner.id == id
                });
            } else if (firstName != null) {
                return shopOwners.find(owner => {
                    return owner.firstName === firstName
                });
            }
        },
        shop: (_, {
            id,
            name
        }) => {
            if (id != null) {
                return shops.find(shop => {
                    return shop.id == id
                })
            } else if (name != null) {
                return shops.find(shop => {
                    return shop.name === name
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
            const item = {
                "id": menuItems.length + 1,
                "name": name,
                "price": price
            };
            menuItems.push(item);
            return item;
        },
        addShop: async (_, {
            name,
            shopOwnerId,
            streetNumber,
            streetName
        }, {
            dataSources
        }) => {
            const newAddress = {
                "id": addresses.length + 1,
                "streetNumber": streetNumber,
                "streetName": streetName
            };
            addresses.push(newAddress);

            const newShop = {
                "id": shops.length + 1,
                "shopOwnerId": shopOwnerId || Math.floor(Math.random() * shopOwners.length) + 1,
                "name": name,
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
        },
        shopOwner(parent) {
            return shopOwners.filter(owner => owner.id === parent.shopOwnerId)[0];
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

///*
// to deploy remotely:
const handler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    },
});

exports.graphqlHandler = handler;
//*/



// to deploy locally:
//server.listen().then(({
//    url
//}) => {
//    console.log(`🚀  Server ready at ${url}`);
//});