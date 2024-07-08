// MODELS/index.js
const mongoose = require('mongoose');

const db = {
    mongoose: mongoose,
    url: process.env.MONGODB_URL 
};

module.exports = db;
