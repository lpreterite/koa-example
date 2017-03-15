'use strict';
const authHooks = require('../../auth/hooks');
const globalHooks = require('../../utils').hooks;

exports.before = {
    all: [],
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