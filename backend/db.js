const mongoose = require('mongoose');
require('dotenv').config()

const connectToDb = () =>{
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to database")
}

module.exports = connectToDb;