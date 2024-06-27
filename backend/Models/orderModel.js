const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    watchId : mongoose.Types.ObjectId,
    customerName : String,
    customerAddress: String,
    customerEmail: String,
    customerContact: String,
    fulfilled : {type : Boolean, default : false}
})

module.exports = mongoose.model('Order' , orderSchema);