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
     
    *  Get Collections
        By Collection ID
     
    *  Get Items 
        By Item ID
    
    * 
     */

    getUserAssignments: async (parent, { userId }, context) => {
      console.log('Getting User Assignments!!');

      try {
        // Getting the distinct collection ids, by user id
        const distinctCollectionIds = await ItemAssignment.distinct(
          'collectionId',
          { userId },
        );

        // Fetch the corresponding collection data for the distinct collectionIds
        const collections = await Collection.find({
          _id: { $in: distinctCollectionIds },
        });

        // Create an object with unique ids and collection data
        const userCollections = {
          userId: userId,
          collections: collections.map((collection) => ({
            collectionId: collection._id.toString(),
            name: collection.name,
            description: collection.description,
            // Additional fields from the collectionData if needed
            // ...
          })),
        };

        if (!userCollections) {
          return [];
        }

        return userCollections;
      } catch (error) {
        console.error('Error fetching assignments:', error);
        throw new Error('Failed to fetch USER ASSIGNMENTS');
      }
    },

    getCollection: async (parent, { collectionId }, context) => {
      console.log('Getting Collection Details');

      try {
        // Getting the distinct item ids, by collection id
        const distinctItemIds = await ItemAssignment.distinct('itemId', {
          collectionId,
        });

        const items = await Item.find({
          _id: { $in: distinctItemIds },
        }).select('name description');

        console.log(items);

        const collectionItems = { collectionId: collectionId, items: items };

        return collectionItems;
      } catch (error) {
        console.error('Error fetching collection details:', error);
        throw new Error('Failed to fetch COLLECTION details');
      }
    },

    getItem: async (parent, { itemId }, context) => {
      console.log('Getting Item details');

      try {
        const item = await Item.findById(itemId);

        console.log(item);

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

