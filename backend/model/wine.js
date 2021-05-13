const mongoose = require('mongoose');

const WineSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true, unique: true},
        wine: [
            {
                name: {type: String, required: true},
                color: {type: String},
                kind: {type: String},
                price: {type: String},
                shop: {type: String},
                rating: {type: String},
                picture: {type: String}
            }
        ]
    },
    {collection: 'wine'}
)

const model = mongoose.model('WineSchema', WineSchema);


module.exports = model;