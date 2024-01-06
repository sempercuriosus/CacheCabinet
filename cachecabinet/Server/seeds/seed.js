const db = require('../config/connection');
const { Collection, Item } = require('../models');
const collectionSeeds = require('./collectionSeeds.json');
const itemSeeds = require('./itemSeeds.json');

db.once('open', async () => {
  try {
    console.log('--- --- --- Start Process:', 'Write Seeds');

    await Collection.insertMany(collectionSeeds);

    await Item.insertMany(itemSeeds);

    console.log('--- --- --- End Process:', 'Write Seeds');
    process.exit(0);
  } catch (error) {
    console.info(
      '--- ',
      'There was an issue creating the seeds.',
      'Error --->',
    );

    console.error(error);

    // exiting the seed process on error
    process.exit(0);
  }
});

