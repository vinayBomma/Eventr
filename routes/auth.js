const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google',
    {scope: ['profile', 'email']}
));

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: 'http://localhost:1000/register'}), (req, res) => {
        res.redirect('http://localhost:1000/');
    });


module.exports = router;