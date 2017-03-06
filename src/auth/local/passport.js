'use strict';

const passport = require('koa-passport');

module.exports = exports.default = function(db){

    //auth plugin
    const LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(function(username, password, done) {
        db.models.users
            .findOne({ where: { username } })
            .then(user => {
                if (username === user.username && password === user.password) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            })
            .catch(err => done(err));
    }));

};