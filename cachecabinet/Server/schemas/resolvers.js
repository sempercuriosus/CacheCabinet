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
        // Assuming ItemAssignment has a userId field
        const assignments = await ItemAssignment.find({ userId });

        // Create an object with unique ids
        const userCollections = {
          userId: userId,
          collectionIds: [
            ...new Set(assignments.map((obj) => obj.collectionId.toString())),
          ],
        };

        if (!userCollections) {
          return [];
        }

        return userCollections;
      } catch (error) {
        console.error('Error fetching assignments:', error);
        throw new Error('Failed to fetch user assignments');
      }
    },
  },

  //   Start Mutations

  //   Mutation: {},
};

module.exports = resolvers;

