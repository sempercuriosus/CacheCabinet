import { Schema, model } from 'mongoose';

const collectionSchema = new Schema({
  id,
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

module.export = Collection;

