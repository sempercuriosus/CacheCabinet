import { Schema, model } from 'mongoose';

const collectionSchema = new Schema({
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
  color: {
    type: String,
    required: false,
    trim: true,
  },
});

const Collection = model('Collection', collectionSchema);

module.exports = Collection;

