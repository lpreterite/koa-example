'use strict';
const co = require('co');

exports.before = {
    all: [
        co.wrap(function *(ctx, next){
            console.log('all hook:',ctx.request.body);
            yield next();
        })
    ],
    find: [],
    get: [],
    create: [],
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