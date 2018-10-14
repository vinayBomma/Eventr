const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String,
    },
    email: {
        type: String,
        required: false,
    },
    displayName: {
        type: String,
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required: false,
    }
});

const User = mongoose.model('users', userSchema);
module.exports = User;