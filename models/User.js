const mongoose = require('mongoose');
const File = require('./File');
//https://stackoverflow.com/questions/33934072/requiring-model-schemas-in-another-model-for-mongoose-in-different-files
const FileSchema = mongoose.model('File').schema;

const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    cpf: String,
    registerID: String,
    accessCard: String,
    gender: String,
    password: String,
    role: String,
    bio: String,
    email: String,
    phone: [String],
    avatar: {
        type: FileSchema,
        default: null
    }
})

UserSchema.virtual('avatar_url').get(function() {
    console.log('chamou o campo virtual')
    if(!this.avatar) return null;
    
    return  `${process.env.APP_URL}/files/${this.avatar.path || ''}`;
});

UserSchema.set('toObject', { virtuals: true })
UserSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('User', UserSchema);