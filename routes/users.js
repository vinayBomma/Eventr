const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const router = express.Router();

require('../models/user');
const User = mongoose.model('users');

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', (req, res) => {
    let errors = [];

    if (req.body.userPassword !== req.body.userPassword2) {
        errors.push({
            text: "Passwords do not match"
        });
    } else if (req.body.userPassword.length <= 7) {
        errors.push({
            text: "Password should have atleast 8 characters"
        });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors: errors,
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
        })
    } else {
        User.findOne({email: req.body.userEmail})
            .then(user => {
                if (user) {
                    res.send('Email already registered');
                } else {
                    const newUser = {
                        name: req.body.userName,
                        email: req.body.userEmail,
                        password: req.body.userPassword,
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