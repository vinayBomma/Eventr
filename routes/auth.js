const router = require('express').Router();
const passport = require('passport');

router.get('/auth/google', passport.authenticate('google',
    {scope: ['profile', 'email']}
));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: 'http://eventrr.herokuapp.com/register'}), (req, res) => {
        res.redirect('http://eventrr.herokuapp.com/');
    });

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {failureRedirect: 'http://eventrr.herokuapp.com/register/'}), (req, res) => {
        res.redirect('http://eventrr.herokuapp.com/');
    });

module.exports = router;