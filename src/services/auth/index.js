'use strict';

const Router = require('koa-router');
const passport = require('koa-passport');
const compose = require('koa-convert').compose;
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(){
    const router = new Router({prefix: '/auth'});

    //auth router
    router.post('/login',
        compose([
            function(ctx, next){
                return passport.authenticate('local', function(err, user, info, status){
                    if(user === false){
                        ctx.body = { code: 401, message: '授权失败', data: {} };
                        ctx.throw(401);
                    }else{
                        const token = jwt.sign({ _id: user.id }, config.get('secret'), { expiresIn: '1h' });
                        ctx.login(user);
                        ctx.body = { code: 200, message: '授权成功', data: user.toJSON() , token: token };
                    }
                })(ctx, next);
            }
        ])
    );
    router.get('/logout',
        compose([
            function(ctx) {
                ctx.logout();
                ctx.body = { code: 200, message: '成功登出', data:{} };
            }
        ])
    );

    return router;
};