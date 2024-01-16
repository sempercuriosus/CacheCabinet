import { gql } from '@apollo/client';

/*
 * LOGIN
 *
 * needs
 * email
 * password
 *
 * returns
 * token
 */
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

/*
 * ADD A USER
 *
 * needs
 * email
 * password
 *
 * returns
 * token
 */
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

/*
 * ADD A COLLECTION
 *
 * needs
 * user id
 * new collection
 * name
 * description
 *
 * returns
 * addCollection obj with
 * name
 * description
 */
export const ADD_COLLECTION = gql`
  mutation AddCollection($collectionData: NewCollection!) {
    addCollection(collectionData: $collectionData) {
      name
      description
    }
  }
`;

/*
 * ADD AN ITEM
 *
 * needs
 * user id
 * collection id
 *
 * returns
 * addItem obj with
 *
 * name
 * description
 * quantity
 * purchasePrice
 * forSale
 */
export const ADD_ITEM = gql`
  mutation AddItem($collectionId: ID!, $itemData: NewItem) {
    addItem(collectionId: $collectionId, itemData: $itemData) {
      name
      description
      quantity
      purchasePrice
      forSale
      dateAdded
      imageData
    }
  }
`;

/*
 * UPDATE A COLLECTION
 *
 * needs
 * user id
 * collection id
 *
 * collection data to update
 * name
 * description
 *
 * returns
 * updated collection data
 * name
 * description
 */
export const UPDATE_COLLECTION = gql`
  mutation UpdateCollection(
    $collectionId: ID!
    $updatedCollection: UpdateCollection!
  ) {
    updateCollection(
      collectionId: $collectionId
      updatedCollection: $updatedCollection
    ) {
      name
      description
    }
  }
`;

/*
 * UPDATE AN ITEM
 *
 * needs
 * user id
 * item id
 *
 * item data to update
 * name
 * description
 * quantity
 * purchasePrice
 * forSale
 *
 * returns
 * updated item data
 * name
 * description
 * quantity
 * purchasePrice
 * forSale
 */
export const UPDATE_ITEM = gql`
  mutation UpdateItem($userId: ID!, $itemId: ID!, $updatedItem: UpdateItem!) {
    updateItem(userId: $userId, itemId: $itemId, updatedItem: $updatedItem) {
      name
      description
      quantity
      purchasePrice
      forSale
      imageData
    }
  }
`;

