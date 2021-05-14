const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String},
        username: {type: String, required: true, unique: true},
        emailAddress: {type: String},
        password: {type: String, required: true},
        created: {type: String, required: true}
    },
    {collection: 'users'}
)

const model = mongoose.model('UserSchema', UserSchema);


module.exports = model;