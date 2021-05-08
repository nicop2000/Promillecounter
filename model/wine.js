const mongoose = require('mongoose');

const WineSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        kind: {type: String, required: true},
        sort: {type: String, required: true},
        rating: {type: Number, required: true},
        shop: {type: String, required: false},
        price: {type: Number, required: false},
        picture: {type: ImageData, required: false}

    },
    {collection: 'wine'}
)

const model = mongoose.model('WineSchema', WineSchema);


module.exports = model;