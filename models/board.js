const mongoose = require('mongoose');

const boardSchema = mongoose.Schema(
    {
        name: String,
        members: [{
            username: String,
            role: String
        }],
        features: [String]
    },
    {
        collection: 'boards'
    }
);

const Board = module.exports = mongoose.model('Board', boardSchema);