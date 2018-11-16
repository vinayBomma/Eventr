const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    })
});

passport.use(
    new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({
            email: email,
        }).then(user => {
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect Email Or Password'
                });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Incorrect Email Or Password'
                    })
                }
            })
        })
    }));


passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: 'https://eventrr.herokuapp.com/auth/google/callback',
    }, (accessToken, refreshToken, profile, done) => {

        const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));

        const newUser = {
            userID: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            image: image,
        };

        User.findOne({
            userID: profile.id
        }).then(user => {

            if (user) {
                done(null, user);
            } else {
                new User(newUser).save()
                    .then(user => done(null, user))
            }

        })

    }));

passport.use(
    new TwitterStrategy({
        consumerKey: keys.twitterClientID,
        consumerSecret: keys.twitterClientSecret,
        callbackURL: 'https://eventrr.herokuapp.com/auth/twitter/callback',
    }, (accessToken, refreshToken, profile, done) => {

        const image = `${profile.photos[0].value.substring(0, profile.photos[0].value.lastIndexOf('_'))}.jpg`;

        const newUser = {
            userID: profile.id,
            displayName: profile.displayName,
            image: image,
        };

        User.findOne({
            userID: profile.id
        }).then(user => {

            if (user) {
                done(null, user)
            } else {
                new User(newUser).save()
                    .then(user => done(null, user))
            }

        })
    }));
