//REQUIRING MODULE
const express = require('express');

// CREATING EXPRESS OBJECT
const app = express();

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
