const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const keys = require('./keys');

require('../models/googleUser');
const GoogleUser = mongoose.model('googleUsers');

const User = mongoose.model('users');

module.exports = function (passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({
            email: email,
        }).then(user => {
            if (!user) {
                return done(null, false, {
                    message: 'No user found'
                });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Password Wrong'
                    })
                }
            })
        })
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: 'http://localhost:1000/auth/google/callback',
        proxy: false,
    }, (accessToken, refreshToken, profile, done) => {
        const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
        const email = JSON.stringify(profile.emails[0]);

        const newgoogleUser = {
            googleID: profile.id,
            email: email,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: image,
        };

        GoogleUser.findOne({
            googleID: profile.id
        }).then(google => {
            if (google) {
                done(null, google);
            } else {
                new GoogleUser(newgoogleUser).save()
                    .then(google => done(null, google))
            }
        })

    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        GoogleUser.findById(id)
            .then(user => done(null, user));
    })

};