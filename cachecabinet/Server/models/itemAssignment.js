const { Schema, model } = require('mongoose');

const itemAssignmentSchema = new Schema(
  {
    //   userId: {
    //     type: String,
    //     required: true,
    //   },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
    //   user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //   },
  },
  {
    // Set the collection name using the 'collection' option
    collection: 'item-assignments', // Specify your desired collection name here
  },
);

const ItemAssignment = model('ItemAssignment', itemAssignmentSchema);

module.exports = ItemAssignment;

