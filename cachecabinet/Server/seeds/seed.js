const db = require('..config/connection');
const { Collection, Item } = require('../models');
const collectionSeeds = require('./collectionSeed.sjson');
const itemSeeds = require('./itemSeeds.json');

db.once('open', async () => {
  try {
    console.log('Start Process:', 'Write Seeds');

    await Collection.insertMany(collectionSeeds);

    await Item.insertMany(itemSeeds);

    console.log('End Process:', 'Write Seeds');
  } catch (error) {
    console.error(
      'There was an issue creating the seeds.',
      'Error --->',
      error,
    );
  }
});

