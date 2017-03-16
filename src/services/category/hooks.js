'use strict';
const co = require('co');
const authHooks = require('../../auth/hooks');
const globalHooks = require('../../utils').hooks;
const R = require('ramda');

const convert = co.wrap(function *(ctx, next){
    ctx.body = R.pipe(
        R.assoc('term', {name:ctx.request.body.name}),
        R.assoc('taxonomy', 'category')
    )(ctx.body);
    yield next();
});

exports.before = {
    all: [
        authHooks.verifyToken({passthrough: false}),
    ],
    find: [],
    get: [],
    create: [
        authHooks.associateCurrentUser(),
        convert
    ],
    update: [
        authHooks.associateCurrentUser(),
        convert
    ],
    patch: [
        authHooks.associateCurrentUser(),
        convert
    ],
    remove: [authHooks.associateCurrentUser()]
};

exports.after = {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
};