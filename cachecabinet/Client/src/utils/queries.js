import { gql } from '@apollo/client';

//
export const GET_USER_ASSIGNMENTS = gql`
  query GetUserAssignments($userId: ID!) {
    getUserAssignments(userId: $userId) {
      userId
      collections {
        _id
        name
        description
      }
    }
  }
`;

//
export const GET_COLLECTION = gql`
  query GetCollection($collectionId: ID!) {
    getCollection(collectionId: $collectionId) {
      collectionId
      items {
        _id
        name
        description
      }
    }
  }
`;

//
export const GET_ITEM = gql`
  query GetItem($itemId: ID!) {
    getItem(itemId: $itemId) {
      _id
      name
      description
      quantity
      purchasePrice
      forSale
      dateAdded
    }
  }
`;

