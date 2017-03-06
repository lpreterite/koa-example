'use strict';

const fs = require('fs');
const co = require('co');
const path = require('path');
const compose = require('koa-convert').compose;
const router = require('koa-router')();

router.get('/', compose([
    co.wrap(function *(ctx, next) {
        const filepath = path.join(ctx.config.get('template_path'), 'index.html');
        ctx.body = fs.createReadStream(filepath);
        yield next();
    }),
    co.wrap(function *(ctx, next) {
        ctx.body += '<p>233</p>';
        ctx.body += '<p>'+typeof ctx.services.users+'</p>';
        yield next();
    })
]));

module.exports = router;