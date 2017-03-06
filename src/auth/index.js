'use strict';

const passport = require('koa-passport');
const db = require('../../migrations/models');
const co = require('co');

module.exports = function(app){
    //passport plugin init
    require('./local/passport')(db);

    //auth setting
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(co.wrap(function *(id, done) {
        if(!db.models.users) done(new Error('User model not find!'));
        try{
            const user = yield db.models.users.findById(id);
            done(null, user);
        } catch(err){
            done(err);
        }
    }));

    //use auth middleware
    //must be up to top
    app.use(passport.initialize());
    app.use(passport.session());
};