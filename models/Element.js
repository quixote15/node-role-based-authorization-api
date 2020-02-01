const mongoose = require('mongoose');

const ElementSchema = new mongoose.Schema({
    type: String,
    name: String,
    title: String,
    description: String,
    choices: [Number]
})


module.exports = mongoose.model('Element', ElementSchema);