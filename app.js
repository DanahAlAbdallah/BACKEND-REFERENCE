const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const db = require('./MODELS');
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log("Connected to DB")
    })
    .catch(err=>{
        console.log("Cannot Connect to DB",err)
        process.exit()
    })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./ROUTES')(app);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});