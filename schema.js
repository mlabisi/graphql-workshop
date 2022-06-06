const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        shops: [Shop]
        shopOwners: [ShopOwner]
        items: [MenuItem]
        item(name: String, id: ID): MenuItem
        shop(id:ID, name: String): Shop
        shopOwner(id:ID, firstName: String): ShopOwner
    }

    type Mutation {
        addMenuItem(name: String!, price: Float): MenuItem
        addShop(name: String, shopOwnerId: Int, streetNumber: String, streetName: String): Shop
        addShopOwner(firstName: String!, lastName: String): ShopOwner
    }
    type Address {
        id: ID
        streetNumber: String
        streetName: String!
        city: String
        zipcode: Int
    }

    type MenuItem {
        id: ID
        name: String!
        price: Float
    }

    type ShopOwner {
        id: ID
        firstName: String!
        lastName: String
    }

    type Shop {
        id: ID
        shopOwner: ShopOwner
        name: String!
        isOpen: Boolean
        motto: String
        address: Address
        menu: [MenuItem]
    }
`;

module.exports = typeDefs;
