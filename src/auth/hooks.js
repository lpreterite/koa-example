'use strict';

const co = require('co');
const compose = require('koa-convert').compose;

function isAuthenticated(){
    return compose([
        co.wrap(function *(ctx, next){
            if(!ctx.state.user) ctx.throw('UnauthorizedError', 401);
            yield next();
        })
    ]);
}

exports.isAuthenticated = isAuthenticated;