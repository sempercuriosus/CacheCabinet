const typeDefs = `
  type User {
    _id: ID!
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type ItemAssignment {
    _id: ID!
    userId: ID!
    collectionId: ID!
    itemId: ID!
    collection: String
  }

  type Item {
    name: String
    description: String
    purchasePrice: Float
    quantity: Int
    dateAdded: String
    image: String
    forSale: Boolean
  }

  type Collection {
    name: String
    description: String
    color: String
  }

  type Query {
    users: [User]
    user(email: String!): User
    collections: [Collection]
    searchItems: Item
    getItemAssignmentByUser: ItemAssignment
    getItemById: Item
    getUser: User
    getItemAssignment: User
  }

  type Mutation {
    addCollection(items: [String]): Collection
    createItemAssignment(userId: ID!, collectionId: ID!, itemId: ID!): ItemAssignment
    updateUser(email: String, password: String): User
    updateItem(id: ID!, quantity: Int!): Item
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;