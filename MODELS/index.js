const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
// console.log("MONGODB_URI:", process.env.MONGODB_URI); // Debugging line

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
    console.error("❌ MONGODB_URI is not defined! Check your .env file.");
    process.exit(1);
}

const db = {};
db.mongoose = mongoose;
db.url = mongodbUri;
db.admins = require('./user.model.js')(mongoose);

module.exports = db;
