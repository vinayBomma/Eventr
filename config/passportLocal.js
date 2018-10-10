const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(
    new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
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