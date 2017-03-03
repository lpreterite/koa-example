'use strict';

const compose = require('koa-convert').compose;
const router = require('koa-router')();
const Promise = require("bluebird");
const co = require('co');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));

const handler = {
    home: co.wrap(function *(ctx, next) {
        const filepath = path.join(ctx.config.get('template_path'), 'index.html');
        ctx.body = fs.createReadStream(filepath);
        yield next();
    }),
    afterHome: co.wrap(function *(ctx, next) {
        ctx.body += '<p>233</p>';
        ctx.body += '<p>'+typeof ctx.services.users+'</p>';
        yield next();
    })
};

router.get('/', compose([handler.home, handler.afterHome]));
// must in babel
// router.get('/', convert.compose(...[handler.home, handler.afterHome]));
module.exports = router;