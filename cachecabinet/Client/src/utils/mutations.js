import { gql } from '@apollo/client';

// LOGIN

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

//  ADD A USER

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

//  ADD A COLLECTION

export const ADD_COLLECTION = gql`
  mutation AddCollection($userId: ID!, $collectionData: NewCollection!) {
    addCollection(userId: $userId, collectionData: $collectionData) {
      name
      description
    }
  }
`;

//  ADD AN ITEM

export const ADD_ITEM = gql`
  mutation AddItem($userId: ID!, $collectionId: ID!, $itemData: NewItem) {
    addItem(userId: $userId, collectionId: $collectionId, itemData: $itemData) {
      name
      description
      quantity
      purchasePrice
      forSale
    }
  }
`;

//  UPDATE A COLLECTION

export const UPDATE_COLLECTION = gql`
  mutation UpdateCollection(
    $userId: ID!
    $collectionId: ID!
    $updatedCollection: UpdateCollection!
  ) {
    updateCollection(
      userId: $userId
      collectionId: $collectionId
      updatedCollection: $updatedCollection
    ) {
      name
      description
    }
  }
`;

//  UPDATE AN ITEM

export const UPDATE_ITEM = `mutation UpdateItem($userId: ID!, $itemId: ID!, $updatedItem: UpdateItem!) {
  updateItem(userId: $userId, itemId: $itemId, updatedItem: $updatedItem) {
    name
    description
    quantity
    purchasePrice
    forSale
  }
}`;

