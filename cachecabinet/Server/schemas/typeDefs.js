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

  type Item {
    _id: ID!
    name: String
    description: String
    quantity: Int
    purchasePrice: Float
    forSale: Boolean
    dateAdded: String
    image: String
  }

  type Collection {
    _id: ID!
    name: String
    description: String
    color: String
  }

  type ItemAssignment {
    _id: ID!
    userId: ID!
    collectionId: ID!
    itemId: ID!
    collection: String
  }

  type UserAssignment{
  userId: ID
  collections: [Collection]
  assignments: [ItemAssignment]
}

  type Query {
    getUser: User 
    getCollections: Collection
    getCollection: Collection
    getItems: Item
    getItem: Item
    getUserAssignments(userId: ID!): UserAssignment
  }
  
  type Mutation {
    addUser: User
  }
`;

module.exports = typeDefs;

