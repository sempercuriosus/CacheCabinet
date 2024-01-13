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

  //   Mutation: {},
};

module.exports = resolvers;

