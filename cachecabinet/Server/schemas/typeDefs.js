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
    salePrice: Float
    forSale: Boolean
    dateAdded: String
    imageData: String
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

  type CollectionDetails{
    collectionId:ID
    items: [Item]
  }

  type Query {
    getUserAssignments: UserAssignment
    getCollection(collectionId: ID!): CollectionDetails
    getItem(itemId: ID!): Item
    getCollectionNameDesc( collectionId: ID!): Collection
  }

  input NewCollection{
    name: String!
    description: String
  }

    input UpdateCollection{
    name: String!
    description: String
  }

  input NewItem{
    name: String!
    description: String
    quantity: Int
    purchasePrice: Float
    salePrice: Float
    forSale: Boolean
    dateAdded: String
    imageData: String!
  }

  input UpdateItem{
    name: String
    description: String
    quantity: Int
    purchasePrice: Float
    salePrice: Float
    forSale: Boolean
    dateAdded: String
    imageData: String!
  }
  
  type DeleteCollectionResponse {
    success: Boolean!
    message: String!
  }

  type DeleteItemResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, password: String!): Auth
    addCollection(collectionData: NewCollection!): Collection
    addItem( collectionId: ID!, itemData: NewItem): Item
    updateCollection( collectionId: ID!, updatedCollection: UpdateCollection!): Collection
    updateItem(itemId: ID!, updatedItem: UpdateItem!): Item
    deleteCollection(collectionId: ID!): DeleteCollectionResponse!
    deleteItem(itemId: ID!): DeleteItemResponse!
  }
`;

module.exports = typeDefs;

