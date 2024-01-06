const db = require('../config/connection');
const { Collection, Item, ItemAssignment /*,User */ } = require('../models');
const collectionSeeds = require('./collectionSeeds.json');
const itemSeeds = require('./itemSeeds.json');
const cleanDB = require('./cleanDB');

// Connection Established
db.once('open', async () => {
  try {
    // Connection Note
    //
    console.info('The Connection is established.', 'Starting the process...');

    // Cleanup the Test Data
    //
    console.log('>>--- Starting Process', '---> Clean Seeds');

    await cleanDB('Collection', 'collections');
    await cleanDB('Item', 'items');
    await cleanDB('ItemAssignment', 'item-assignments');

    console.log('>>--- Ending Process', '---> Clean Seeds');

    // Seed the Database
    //
    console.log('>>--- Starting Process', '---> Write Seeds');

    // Insert Collection Seed Data
    //
    const collections = await Collection.insertMany(collectionSeeds);

    // Insert Item Seed Data
    //
    const items = await Item.insertMany(itemSeeds);

    console.log(ItemAssignment);

    // Create associations between collections and items in the ItemAssignment model
    for (const collection of collections) {
      for (const item of items) {
        // Create ItemAssignment document for each combination
        const newItemAssignment = new ItemAssignment({
          collectionId: collection._id,
          itemId: item._id,
        });

        await newItemAssignment.save();
      }
    }

    console.log(collections, items);

    // Insert User Seed Data
    //
    // await User.insertMany(userSeeds);

    console.log('>>--- Ending Process', '---> Write Seeds');

    // Exit Gracefully
    process.exit(1);
  } catch (error) {
    console.info(
      '--- ',
      'There was an issue creating the seeds.',
      'Error --->',
    );

    console.error(error);

    // Exit on Error
    process.exit(0);
  }
});

