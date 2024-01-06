const { Schema, model } = require('mongoose');

const itemAssignment = new Schema({
  //   userId: {
  //     type: String,
  //     required: true,
  //   },
  collectionId: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
  collection: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
  },
  //   user: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //   },
});

const ItemAssignment = model('ItemAssignment', itemAssignment);

module.exports = ItemAssignment;

