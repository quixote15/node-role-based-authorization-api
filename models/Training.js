const mongoose = require('mongoose');
const File = require('./File');
const FileSchema = mongoose.model('File').schema;

const TrainingSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    banner: {
        type: FileSchema,
        default: null,
    },
})


TrainingSchema.virtual('banner_url').get(function() {
    console.log('chamou o campo virtual')
    if(!this.banner) return null;
    
    return  `${process.env.APP_URL}/files/${this.banner.path || ''}`;
});

TrainingSchema.set('toObject', { virtuals: true })
TrainingSchema.set('toJSON', { virtuals: true })


module.exports = mongoose.model('Training', TrainingSchema);