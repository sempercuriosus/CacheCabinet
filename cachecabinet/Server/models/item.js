const { Schema, model, Types } = require('mongoose');

const itemSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  purchasePrice: {
    type: Number,
    default: 0.0,
    required: false,
  },
  salePrice: {
    type: Number,
    default: 0.0,
    required: false,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  forSale: {
    type: Boolean,
    default: false,
  },
});

const Item = model('Item', itemSchema);

module.exports = Item;

