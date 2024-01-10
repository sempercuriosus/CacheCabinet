const { AuthenticationError } = require('apollo-server-express');
const { User, Collection, Item, ItemAssignment } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        collections: async () => Collection.find(),
        searchItems: async (parent, { name, collection }) => {
            const params = {};

            if (collection) {
                params.collection = collection;
            }

            if (name) {
                params.name = {
                    $regex: name,
                };
            }

            return Item.find(params).populate('collection');
        },

        getItemAssignmentByUser: async (parent, args, context) => {
            try {
                if (context.user) {
                    const userItemAssignments = await ItemAssignment.find({ userId: context.user.id });

                    return userItemAssignments;
                }

                throw new AuthenticationError('Not logged in');
            } catch (error) {
                throw new Error('Error fetching ItemAssignments: ' + error.message);
            }
        },

        getItemById: async (parent, { id }) =>
          Item.findById(id).populate('collection'),

        getUser: async (parent, args, context) => {
          if (context.user) {
            const user = await User.findById(context.user.id).populate({
                path: 'itemassignment.items', //update to correct path
                populate: 'collection',
            });

            if (user && user.items) {
                user.items.sort((a, b) => b.uploadDate - a.uploadDate);
            }

            return user;
          }

      throw new AuthenticationError('Not logged in');
    },

    getItemAssignment: async (parent, { id }, context) => {
        if (context.user) {
            const user = await User.findById(context.user.id).populate({
                path: 'itemassignment.items', //update correctly
                populate: 'collection',
            });

            return user.items.id(id);
        }

        throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            try {
                const user = await User.create(args);
                const token = signToken(user);

                return { token, user };
            } catch (error) {
                throw new Error('Error creating user: ' + error.message);
            }
        },


        addCollection: async (parent, { items }, context) => {
            try {
                if (context.user) {
                    const collection = new Collection({ items });
                    
                    await User.findByIdAndUpdate(context.user.id, {
                        $push: { collections: collection },
                    });

                    return collection;
                }

            throw new AuthenticationError('Not logged in');
        } catch (error) {
            throw new Error('Error adding collection: ' + error.message);
        }

    },

    createItemAssignment: async (parent, { userId, collectionId, itemId }, context) => {
        try {
            if (context.user) {
                const newItemAssignment = await ItemAssignment.create({
                    userId,
                    collectionId,
                    itemId,
                });

                return newItemAssignment;
            }

            throw new AuthenticationError('Not logged in');
        } catch (error) {
            throw new Error('Error creating ItemAssignment: ' + error.message);
        }
    },

    updateUser: async (parent, args, context) => {
        try {
            if (context.user) {
                return User.findByIdAndUpdate(context.user.id, args, {
                new: true,
                });
            }

        throw new AuthenticationError('Not logged in');
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    },
    
    updateItem: async (parent, { id, quantity }) => {
        try {
            const decrement = Math.abs(quantity) * -1;

            return await Item.findByIdAndUpdate(
            id,
            { $inc: { quantity: decrement }},
            { new: true }
        );
        } catch (error) {
            throw new Error('error updating item: ' + error.message);
        }
    },

    login: async (parent, { email, password }) => {
        try {
            const user = await User.findOne({ email });
                
            if (!user || !(await user.isCorrectPassword(password))) {
                throw new AuthenticationError('Email or password incorrect');
            }

            const token = signToken(user);

            return { token, user };
        } catch (error) {
            throw new Error('Error during login: ' + error.message);
        }
    },
    },
};

module.exports = resolvers;
