const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const googleSchema = new Schema({
    googleID: {
        type: String,
    },
    email: {
        type: String,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String,
    },
    image: {
        type: String,
    }
});

mongoose.model('googleUsers', googleSchema);