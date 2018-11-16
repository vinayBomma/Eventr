const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

require('../models/event');
const Event = mongoose.model('events');

router.get('/', ensureAuthenticated, (req, res) => {
    Event.find({user: req.user.id} )
        // res.render('index', {
        //     events: data,
        //     user: req.user,
        //     text: 'Home',
        // });
        .then((event) => {
            res.render('index', {
                    event,
                    // date: JSON.stringify(Event.schema.obj.date),
                    // title: JSON.stringify(Event.schema.obj.title),
                    // eventID: req.id,
                    // eventUser: event.user,
                    text: 'Home'
                }
            );
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
            res.redirect('/');
        }).catch((err) => {
        res.status(400).send('Error', err)
    });
});


router.delete('/:id', ensureAuthenticated, (req, res) => {
    Event.remove({_id: req.params.id})
        .then(() => {
            res.redirect('/');
        })
});

module.exports = router;