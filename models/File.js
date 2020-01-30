const mongoose = require('mongoose');


const FileSchema = new mongoose.Schema({
    name: String,
    path: String,
})

//https://mongoosejs.com/docs/tutorials/virtuals.html


module.exports = mongoose.model('File', FileSchema);