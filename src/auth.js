'use strict';

const passport = require('koa-passport');
const co = require('co');
const db = require('../migrations/models');
const Router = require('koa-router');

module.exports = function(app){
    // db start
    db.sequelize.sync();

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

    //auth plugin
    const LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(function(username, password, done) {

        db.models.users.findAndCount().then(data=>console.log(data));

        db.models.users
            .findOne({ where: { username } })
            .then(user => {
                console.log(user);
                if (username === user.username && password === user.password) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            })
            .catch(err => done(err));
    }));

    //auth router
    var router = Router({prefix: '/auth'});
    router.post('/login',
        passport.authenticate('local', {
            successRedirect: '/test',
            failureRedirect: '/'
        })
    );
    router.get('/logout', function(ctx) {
        ctx.logout();
        ctx.redirect('/');
    });
    app.use(router.routes());
    app.use(router.allowedMethods());

    app.use(passport.initialize());
    app.use(passport.session());
};