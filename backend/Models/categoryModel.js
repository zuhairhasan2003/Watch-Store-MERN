const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    img: String,
    categoryName: String,
    description: String
});

module.exports = mongoose.model('category', categorySchema);