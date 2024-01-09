const { Schema, model } = require('mongoose');

const itemAssignmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  },
  {
    // Set the collection name using the 'collection' option
    collection: 'item-assignments', // Specify your desired collection name here
  },
);

const ItemAssignment = model('ItemAssignment', itemAssignmentSchema);

module.exports = ItemAssignment;

