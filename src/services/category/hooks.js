'use strict';
const co = require('co');
const authHooks = require('../../auth/hooks');
const globalHooks = require('../../utils').hooks;
const R = require('ramda');

const convert = co.wrap(function *(ctx, next){
    ctx.request.body = R.pipe(
        R.assoc('term', {name:ctx.request.body.name}),
        R.assoc('taxonomy', 'category')
    )(ctx.request.body);
    yield next();
});

exports.before = {
    all: [
        authHooks.verifyToken({passthrough: false}),
        authHooks.populateUser(),
    ],
    find: [],
    get: [],
    create: [
        globalHooks.include([{ model: 'term' , as: 'term'}]),
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