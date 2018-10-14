const router = require('express').Router();
const passport = require('passport');

router.get('/auth/google', passport.authenticate('google',
    {scope: ['profile', 'email']}
));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: 'http://localhost:1000/register'}), (req, res) => {
        res.redirect('http://localhost:1000/');
    });

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {failureRedirect: 'http://localhost:1000/register/twitter'}), (req, res) => {
        res.redirect('http://localhost:1000/');
    });

module.exports = router;