const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
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
    type: Schema.Types.Decimal128,
    required: false,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  dateAdded: {
    type: Date,
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

