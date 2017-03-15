'use strict';
const co = require('co');
const authHooks = require('../../auth/hooks');
const globalHooks = require('../../utils').hooks;

exports.before = {
    all: [
        co.wrap(function *(ctx, next){
            // console.log('all hook:', ctx.request.body);
            yield next();
        })
    ],
    find: [
        // authHooks.authToken({passthrough: false})
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
};

exports.after = {
    all: [
        globalHooks.remove('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
};