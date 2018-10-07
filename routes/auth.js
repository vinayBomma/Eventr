const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:1000/login'}), (req, res) => {
        res.redirect('http://localhost:1000/');
    });

router.get('/verify', (req, res) => {
    if (req.user) {
        res.send('auth is present')
    }else{
        res.send('auth is not there')
    }
});

module.exports = router;
