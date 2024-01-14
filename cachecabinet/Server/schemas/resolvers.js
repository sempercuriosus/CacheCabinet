const { AuthenticationError } = require('apollo-server-express');
const { User, Collection, Item, ItemAssignment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  //    Start Queries
  Query: {
    /*
     *** Queries
     
    *  Get Assignments 
        By User ID
     
    *  Get Collection (containing the items)
        By Collection ID
     
    *  Get Item
        By Item ID
    
    * 
     */

    getUserAssignments: async (parent, { userId }, context) => {
      // console.log('Getting User Assignments!!');

      try {
        // Getting the distinct collection ids, by user id
        const distinctCollectionIds = await ItemAssignment.distinct(
          'collectionId',
          { userId },
        );

        // Fetch the corresponding collection data for the distinct collectionIds
        const userCollections = await Collection.find({
          _id: { $in: distinctCollectionIds },
        });

        const collections = { userId: userId, collections: userCollections };

        if (!collections) {
          return [];
        }

        return collections;
      } catch (error) {
        console.error('Error fetching assignments:', error);
        throw new Error('Failed to fetch USER ASSIGNMENTS');
      }
    },

    getCollection: async (parent, { collectionId }, context) => {
      // console.log('Getting Collection Details');

      try {
        // Getting the distinct item ids, by collection id
        const distinctItemIds = await ItemAssignment.distinct('itemId', {
          collectionId,
        });

        // Getting the item name and description for the cards
        const items = await Item.find({
          _id: { $in: distinctItemIds },
        }).select('name description');

        const collectionItems = { collectionId: collectionId, items: items };

        return collectionItems;
      } catch (error) {
        console.error('Error fetching collection details:', error);
        throw new Error('Failed to fetch COLLECTION details');
      }
    },

    getItem: async (parent, { itemId }, context) => {
      // console.log('Getting Item details');

      try {
        // Getting the Item Details
        const item = await Item.findById(itemId);

        return item;
      } catch (error) {
        console.error('Error fetching item details:', error);
        throw new Error('Failed to fetch ITEM details');
      }
    },
  },

  //   Start Mutations

  Mutation: {
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !(await user.isCorrectPassword(password))) {
          throw new AuthenticationError('Email or password incorrect');
        }
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Error during LOGIN: ' + error.message);
      }
    },

    // Create/ Add
    // User
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Error creating USER: ' + error.message);
      }
    },

    // Collection
    addCollection: async (parent, { userId, collectionData }, context) => {
      try {
        // Create new collection
        const newCollection = await Item.create(collectionData);

        // Get the new Collection ID
        const collectionId = newCollection._id;

        const newItemAssignment = new ItemAssignment({
          userId: userId,
          collectionId: collectionId,
        });

        await newItemAssignment.save();

        console.log(
          'New Collection ID',
          collectionId,
          'created by user',
          userId,
        );

        // return the new data
        return newCollection;
      } catch (error) {
        console.error('Error creating new collection:', error);

        throw new Error('Failed to create new COLLECTION');
      }
    },

    // Item
    addItem: async (parent, { userId, collectionId, itemData }, context) => {
      try {
        // Create new item
        const newItem = await Item.create(itemData);

        // Get the new Item ID
        const itemId = newItem._id;

        // Create the Item Assignment
        const newItemAssignment = new ItemAssignment({
          userId: userId,
          collectionId: collectionId,
          itemId: itemId,
        });

        // add the new item to the ItemAssignment collection
        await newItemAssignment.save();

        console.log(
          'New Item ID',
          itemId,
          'in collection',
          collectionId,
          'created by user',
          userId,
        );

        // return the new data
        return newItem;
      } catch (error) {
        console.error('Error creating new item:', error);

        throw new Error('Failed to create new ITEM');
      }
    },

    // update

    // collection

    updateCollection: async (
      parent,
      { userId, collectionId, updatedCollection },
      context,
    ) => {
      try {
        // get the existing collection
        const existingCollection = await Item.findById(collectionId);

        if (existingCollection) {
          // set the new values
          existingCollection.name = updatedCollection.name;
          existingCollection.description = updatedCollection.description;

          // save them to the collection
          const updateResult = await existingCollection.save();

          console.log(
            'updating',
            collectionId,
            'new collection information',
            existingCollection,
          );

          // return updates
          return updateResult;
        }
      } catch (error) {
        console.error('Error updating collection:', error);

        throw new Error('Failed to UPDATE collection');
      }
    },

    // item

    updateItem: async (
      parent,
      { userId, itemId, updatedItem: updatedItem },
      context,
    ) => {
      try {
        // item
        const existingItem = await Item.findById(itemId);

        if (existingItem) {
          // set the new values
          existingItem.name = updatedItem.name;
          existingItem.description = updatedItem.description;

          // save them to the collection
          const updateResult = await existingItem.save();

          console.log('updating', itemId, 'new Item information', existingItem);

          // return updates
          return updateResult;
        }
      } catch (error) {
        console.error('Error updating collection:', error);

        throw new Error('Failed to UPDATE collection');
      }
    },
  },
};

module.exports = resolvers;

