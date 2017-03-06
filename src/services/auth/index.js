'use strict';

const Router = require('koa-router');
const passport = require('koa-passport');
const compose = require('koa-convert').compose;

module.exports = function(){
    const router = new Router({prefix: '/auth'});

    //auth router
    router.post('/login',
        compose([
            passport.authenticate('local', {
                successRedirect: '/test',
                failureRedirect: '/'
            })
        ])
    );
    router.get('/logout',
        compose([
            function(ctx) {
                ctx.logout();
                ctx.redirect('/');
            }
        ])
    );

    return router;
};