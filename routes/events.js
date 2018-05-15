const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/event');
const Event = mongoose.model('events');

router.get('/', (req, res) => {
    res.send('Direct past')
});

router.post('/', (req, res) => {
    res.send('Through button past');
});

module.exports = router;