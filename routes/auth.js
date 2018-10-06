const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:1000/login'}), (req, res) => {
        res.redirect('http://localhost:1000/');
        console.log(res)
    });

module.exports = router;