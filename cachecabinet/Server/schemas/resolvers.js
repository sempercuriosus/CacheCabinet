const { AuthenticationError } = require('apollo-server-express');
const { User, Collection, Item, ItemAssignment } = require('../models');
const { signToken } = require('../utils/auth');
const { ObjectId } = require('mongodb');
const dateHelper = require('../utils/dateHelper');

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

    getUserAssignments: async (parent, args, context) => {
      // console.log('Getting User Assignments!!');

      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }

      console.log('Request from', context.user);

      try {
        // Getting the distinct collection ids, by user id

        const userId = context.user._id;

        const distinctCollectionIds = await ItemAssignment.distinct(
          'collectionId',
          { userId },
        );

        // Fetch the corresponding collection data for the distinct collectionIds
        const userCollections = await Collection.find({
          _id: { $in: distinctCollectionIds },
        });

        const collections = { collections: userCollections };

        return collections;
      } catch (error) {
        console.error('Error fetching assignments:', error);

        throw new Error('Failed to fetch USER ASSIGNMENTS');
      }
    },

    getCollectionNameDesc: async (parent, { collectionId }, context) => {
      console.log('Request from', context.user, 'getting', collectionId);

      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }

      const _id = new ObjectId(collectionId);

      try {
        // Fetch the corresponding collection data for the distinct collectionIds
        const collectionData = await Collection.findById({
          _id: _id,
        });

        console.log(collectionData);

        return collectionData;
      } catch (error) {
        console.error('Error fetching collection details:', error);

        throw new Error('Failed to fetch COLLECTION  DETAILS');
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
        });

        // Format items details
        const formattedItems = items.map((item) => {
          const formattedDate = dateHelper(item.dateAdded);

          return {
            _id: item._id,
            name: item.name || '',
            description: item.description || '',
            purchasePrice: item.purchasePrice || 0.0,
            salePrice: item.salePrice || 0.0,
            quantity: item.quantity || 0,
            dateAdded: formattedDate,
            imageData: item.imageData || '',
            forSale: item.forSale || false,
          };
        });

        const collectionItems = {
          collectionId: collectionId,
          items: formattedItems,
        };

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

        const itemDataSanitized = {
          _id: item._id,
          name: item.name,
          description: item.description || '',
          quantity: item.quantity || 0,
          purchasePrice: item.purchasePrice || 0.0,
          salePrice: item.salePrice || 0.0,
          forSale: item.forSale || false,
          dateAdded: dateHelper(item.dateAdded),
          imageData: item.imageData || '',
        };

        return itemDataSanitized;
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
    addCollection: async (parent, { collectionData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }

      try {
        const userId = context.user._id;

        console.log(collectionData);

        // Create new collection
        const newCollection = await Collection.create(collectionData);

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
    addItem: async (parent, { collectionId, itemData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }

      const userId = context.user._id;

      try {
        const itemDataSanitized = {
          name: itemData.name,
          description: itemData.description || '',
          quantity: itemData.quantity || 0,
          purchasePrice: itemData.purchasePrice || 0.0,
          salePrice: itemData.salePrice || 0.0,
          forSale: itemData.forSale || false,
          dateAdded: dateHelper(itemData.dateAdded),
          imageData: itemData.imageData || '',
        };

        // Create new item
        const newItem = await Item.create(itemDataSanitized);

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
      { collectionId, updatedCollection },
      context,
    ) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }

      try {
        const userId = context.user._id;

        // get the existing collection
        let existingCollection = await Collection.findById(collectionId);

        if (existingCollection) {
          // set the new values
          existingCollection.name = updatedCollection.name;
          existingCollection.description = updatedCollection.description;

          // save them to the collection
          const updateResult = await existingCollection.save();

          console.log(
            'user',
            userId,
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
      { itemId, updatedItem: updatedItem },
      context,
    ) => {
      try {
        // item
        const existingItem = await Item.findById(itemId);

        console.log('UPDATED', updatedItem);

        if (existingItem) {
          // set the new values
          existingItem.name = updatedItem.name;
          existingItem.description = updatedItem.description;
          existingItem.purchasePrice = updatedItem.purchasePrice;
          existingItem.dateAdded = dateHelper(updatedItem.dateAdded);
          existingItem.forSale = updatedItem.forSale;
          existingItem.salePrice = updatedItem.salePrice;
          existingItem.imageData = updatedItem.imageData;

          // save them to the collection
          const updateResult = await existingItem.save();

          console.log('updating', itemId, 'new Item information', updatedItem);

          // return updates
          return updateResult;
        }
      } catch (error) {
        console.error('Error updating collection:', error);

        throw new Error('Failed to UPDATE collection');
      }
    },

      // delete collection
    deleteCollection: async (parent, { collectionId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }

      try {
        const userId = context.user._id;

        // check if user has permission to delete collection
        const collection = await Collection.findById(collectionId);
        if (!collection) {
          throw new Error('Collection not found');
        }
        if (collection.userId && collection.userId.toString() !== userId.toString()) {
          throw new Error('User is not authorized to delete this collection');
        }

        // delete collection
        const deleteResult = await Collection.deleteOne({ _id: collectionId });

        console.log('Collection deleted:', collectionId);

        return {
          success: deleteResult.ok === 1,
          message: deleteResult.ok ===1 ? 'Collection deleted successfully' : 'Failed to delete collection',
        };
      } catch (error) {
        console.error('Error deleting collection:', error);
        throw new Error('Failed to delete collection');
      }
    },

    // delete item
    deleteItem: async (parent, { itemId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }

      try {
        const userId = context.user._id;

        // check if user has permission to delete the item
        const item = await Item.findById(itemId);
        if (!item) {
          throw new Error('Item not found');
        }

        // get collection ID associated with the item
        const assignment = await ItemAssignment.findOne({ itemId });
        if (!assignment) {
          throw new Error('Item assignment not found');
        }
        const collectionId = assignment.collectionId;

        // check if the user has permission to delete the item
        const collection = await Collection.findById(collectionId);
        if (!collection) {
          throw new Error('Collection not found');
        }
        if (collection.userId && collection.userId.toString() !== userId.toString()) {
          throw new Error('User is not authorized to delete this item');
        }

        // delete the item
        const deleteResult = await Item.deleteOne({ _id: itemId });

        console.log('Item deleted:', itemId);

        return {
          success: deleteResult.ok === 1,
          message: deleteResult.ok === 1 ? 'Item deleted successfully' : 'Failed to delete item',
        };
      } catch (error) {
        console.error('Error deleting item:', error);
        throw new Error('Failed to delete item');
      }
    },
  },
};

module.exports = resolvers;

