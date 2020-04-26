const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        name: String
    },
    {
        collection: 'users'
    }
);

const User = module.exports = mongoose.model('User', userSchema);