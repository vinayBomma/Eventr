const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const keys = require('./keys');

const User = mongoose.model('users');

module.exports = function (passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({
            email: email,
        }).then(user => {
            if (!user){
                return done(null, false, {
                    message: 'No user found'
                });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    return done(null, user);
                }else {
                    return done(null, false, {
                        message: 'Password Wrong'
                    })
                }
            })
        })
    }));

    passport.serializeUser(function(user, done){
        done(null, user.id)
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });


    passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: 'auth/google/callback',
        proxy: true,
    }, (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile)
    }))

};