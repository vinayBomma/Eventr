const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

require('../models/user');
const User = mongoose.model('users');

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash: true
    })(req, res, next)
});

router.post('/register', (req, res) => {
    let errors = [];

    if (req.body.password !== req.body.password2) {
        errors.push({
            text: "Passwords do not match"
        });
    } else if (req.body.password.length <= 7) {
        errors.push({
            text: "Password should have at least 8 characters"
        });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors: errors,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
    } else {
        User.findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    res.send('Email already registered');
                } else {
                    const newUser = {
                        name: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                    };

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;

                            new User(newUser).save()
                                .then(() => {
                                    res.redirect('/login');
                                }).catch((err) => {
                                res.status(400).send(err);
                            })
                        })
                    });
                }
            });

    }
});

module.exports = router;