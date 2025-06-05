const mongoose = require('mongoose');
require("dotenv").config();
const url = process.env.MONGODB_URL;

const db = () => {
    mongoose.connect(url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
        process.exit(1);
    })
}

module.exports=db;







