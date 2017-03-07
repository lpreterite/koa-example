'use strict';

const config = require('config');
const co = require('co');
const compose = require('koa-convert').compose;
const jwt = require('koa-jwt');

function isAuthenticated(){
    return compose([
        co.wrap(function *(ctx, next){
            if(!ctx.state.user) ctx.throw('UnauthorizedError', 401);
            yield next();
        })
    ]);
}

function authToken(opts){
    opts = Object.assign({
        secret: config.get('secret'),
        passthrough: true
    }, opts);
    return compose([
        function *(next) {
            if(this.query && this.query.access_token){
                this.headers.authorization = 'Bearer ' + this.query.access_token;
            }
            yield next;
        },
        jwt(opts)
    ]);
}

exports.isAuthenticated = isAuthenticated;
exports.authToken = authToken;