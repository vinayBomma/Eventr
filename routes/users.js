const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

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
        res.send('Successful Registration!')
    }
});

module.exports = router;