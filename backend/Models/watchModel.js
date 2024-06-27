const mongoose = require('mongoose')

const watchSchema = new mongoose.Schema({
    price: Number,
    img: String,
    modelNumber : String,
    description: String,
    // Categories can be : Leather straps , chain straps , designer warches etc
    categoryName: String,
    quantity: Number
})

module.exports = mongoose.model('Watch' , watchSchema);