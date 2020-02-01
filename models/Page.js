const mongoose = require('mongoose');
const Element = require('./Element');
const ElementSchema = mongoose.model('Element').schema;


const PageSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    elements: [ElementSchema]
});


module.exports = mongoose.model('Page', PageSchema);