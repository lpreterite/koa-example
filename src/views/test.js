'use strict';

const fs = require('fs');
const co = require('co');
const path = require('path');
const compose = require('koa-convert').compose;
const router = require('koa-router')();
const authHooks = require('../auth/hooks');

router.get('/', compose([
    authHooks.isAuthenticated(),
    co.wrap(function *(ctx, next) {
        const filepath = path.join(ctx.config.get('template_path'), 'test.html');
        ctx.body = fs.createReadStream(filepath);
        yield next();
    })
]));
module.exports = router;