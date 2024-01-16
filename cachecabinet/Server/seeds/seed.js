const db = require('../config/connection');
const { Collection, Item, ItemAssignment, User } = require('../models');
const collectionSeeds = require('./collectionSeeds.json');
const itemSeeds = require('./itemSeeds.json');
const userSeeds = require('./userSeeds.json');
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

    console.log('---> Clean Collection');
    await cleanDB('Collection', 'collections');

    console.log('---> Clean Items');
    await cleanDB('Item', 'items');

    console.log('---> Clean Assignments');
    await cleanDB('ItemAssignment', 'item-assignments');

    console.log('---> Clean Users');
    await cleanDB('User', 'users');

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

    // Insert User Seed Data
    const users = await User.create(userSeeds);

    // Create associations between collections and items in the ItemAssignment model
    for (const user of users) {
      for (const collection of collections) {
        for (const item of items) {
          // Create ItemAssignment document for each combination
          const newItemAssignment = new ItemAssignment({
            userId: user._id,
            collectionId: collection._id,
            itemId: item._id,
          });

          await newItemAssignment.save();
        }
      }
    }

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

