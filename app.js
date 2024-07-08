//REQUIRING MODULE
const express = require('express');

// CREATING EXPRESS OBJECT
const app = express();
const cors = require('cors');

require('dotenv').config();

//MONGOOSE DATABASE CONNECTION
const db = require('./MODELS');
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log("Connected to DB")
    })
    .catch(err=>{
        console.log("DB url",db.urld)
        console.log("Cannot Connect to DB",err)
        process.exit()
    })
// HANDELING GET REQUEST
app.get('/', (req, res) => {
    res.send('A simple Node App is '
        + 'running on this server')
    res.end()
})

//PORT NUMBER
const PORT = process.env.PORT || 5000;

// SERVER SETUP
app.listen(PORT, console.log(
    `Server started on port ${PORT}`));
