'use strict';

const config = require('config');
const co = require('co');
const compose = require('koa-convert').compose;
const jwt = Object.assign(require('koa-jwt'), require('jsonwebtoken'));

function isAuthenticated(){
    return compose([
        co.wrap(function *(ctx, next){
            if(ctx.isUnauthenticated()) ctx.throw('UnauthorizedError', 401);
            yield next();
        })
    ]);
}

function verifyToken(opts){
    opts = Object.assign({
        secret: config.get('secret'),
        key: 'jwtData',
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

function populateUser(){
    return co.wrap(function *(ctx, next){
        const currentUser = yield ctx.sequelize.models.users.findById(ctx.state.jwtData._id);
        ctx.state.user = ctx.state.user || currentUser.toJSON();
        yield next();
    });
}

function associateCurrentUser(opts){
    opts = Object.assign({as: 'uid'}, opts);
    return co.wrap(function *(ctx, next){
        ctx.request.body[opts.as] = ctx.state.user.id;

        yield next();
    });
}

exports.isAuthenticated = isAuthenticated;
exports.verifyToken = verifyToken;
exports.associateCurrentUser = associateCurrentUser;
exports.populateUser = populateUser;