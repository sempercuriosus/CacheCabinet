const models = require('../models');
const db = require('../config/connection');
const mongoose = require('mongoose');

module.exports = async (modelName, collectionName) => {
  try {
    // Take the model, if it exists, and convert it to an array
    const Model = models[modelName];

    const collectionHasData = await mongoose.connection.db
      .listCollections({
        name: collectionName,
      })
      .toArray();

    // Checking that the model has data that are present
    if (collectionHasData.length) {
      // drop if true
      await Model.collection.drop();
    }
  } catch (err) {
    console.error(
      'There was an error in cleaning the Seed Data from the Database...',
    );
    throw err;
  }
};

