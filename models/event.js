const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: false,
    },
});

mongoose.model('events', eventSchema);
