const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

require('../models/event');
const Event = mongoose.model('events');

router.get('/', ensureAuthenticated, (req, res) => {
    Event.find({user: req.user.id})
        .then((event) => {
            res.render('index', {
                event,
            });
        });
});

router.post('/', ensureAuthenticated, (req, res) => {
    let dateVal = new Date(req.body.date + ' ' + req.body.time + ':00').getTime();
    const newEvent = {
        title: req.body.eventName,
        date: dateVal,
        user: req.user.id,
    };

    new Event(newEvent).save()
        .then(() => {
            // req.flash('success_msg', 'Event Added');
            res.redirect('/');
        }).catch((err) => {
        res.status(400).send('Error', err)
    });
});


router.delete('/:id', ensureAuthenticated, (req, res) => {
    Event.remove({_id: req.params.id})
        .then(() => {
            if (event.id !== req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/')
            } else {
                req.flash('success_msg', 'Event Removed');
                res.redirect('/');
            }
        }).catch(() => {
        res.status(400).send('Error')
    });
});

module.exports = router;