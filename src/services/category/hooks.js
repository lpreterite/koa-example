'use strict';
const co = require('co');
const _ = require('ramda');
const authHooks = require('../../auth/hooks');
const globalHooks = require('../../utils').hooks;

exports.before = {
    all: [
        co.wrap(function *(ctx, next){
            ctx.request.query = Object.assign({ taxonomy: 'category' }, ctx.request.query);
            yield next();
        })
    ],
    find: [],
    get: [],
    create: [authHooks.verifyToken({passthrough: false})],
    update: [],
    patch: [],
    remove: []
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