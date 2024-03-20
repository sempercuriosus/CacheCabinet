import { gql } from '@apollo/client';

/*
 * GET USER ASSIGNMENTS
 * gets all of a user's collections to display in cards
 *
 * needs
 * user id
 *
 * returns
 * collection _id, collection name, collection description
 *
 */
export const GET_USER_ASSIGNMENTS = gql`
  query GetUserAssignments {
    getUserAssignments {
      collections {
        _id
        name
        description
      }
    }
  }
`;

/*
 * GET COLLECTION
 * gets a single collection's item details
 *
 * needs
 * collection id
 *
 * returns
 * items id
 * items name
 * items description
 *
 */
export const GET_COLLECTION = gql`
  query GetCollection($collectionId: ID!) {
    getCollection(collectionId: $collectionId) {
      collectionId
      items {
        _id
        name
        description
        dateAdded
        forSale
        purchasePrice
        salePrice
        quantity
        imageData
      }
    }
  }
`;

/*
 * GET ITEM
 * gets a single item's details
 *
 * needs
 * item id
 *
 * returns
 * item name
 * item description
 * item quantity
 * item purchasePrice
 * item forSale
 * item dateAdded
 */
export const GET_ITEM = gql`
  query GetItem($itemId: ID!) {
    getItem(itemId: $itemId) {
      _id
      name
      imageData
      description
      quantity
      purchasePrice
      forSale
      dateAdded
      salePrice
    }
  }
`;

export const GET_COLLECTION_NAMEDESC = gql`
  query GetCollectionNameDesc($collectionId: ID!) {
    getCollectionNameDesc(collectionId: $collectionId) {
      name
      description
    }
  }
`;

export const DELETE_COLLECTION = gql`
  mutation DeleteCollection($collectionId: ID!) {
    deleteCollection(collectionId: $collectionId) {
      success
      message
    }
  }
  `;

export const DELETE_ITEM = gql`
  mutation DeleteItem($itemId: ID!) {
    deleteItem(itemId: $itemId) {
      success
      message
    }
  }
  `;