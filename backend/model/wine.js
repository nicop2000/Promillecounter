const mongoose = require('mongoose');

const WineSchema = new mongoose.Schema(
    {
            userId: {type: String, required: true, unique: true},
            wine: [{name: {type: String, required: true}, farbe: {type: String}}]
    },
    {collection: 'wine'}
)

const model = mongoose.model('WineSchema', WineSchema);


module.exports = model;