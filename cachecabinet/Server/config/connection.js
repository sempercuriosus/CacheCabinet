require('dotenv').config();
const mongoose = require('mongoose');
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

// consider changing this to the local host and then setting an env variable for the full uri
const conn_string = `mongodb+srv://${user}:${password}@cluster0.qcvowdc.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.connect(process.env.MONGODB_URI || conn_string);

module.exports = mongoose.connection;

