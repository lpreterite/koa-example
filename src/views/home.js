'use strict';

const convert = require('koa-convert');
const router = require('koa-router')();
const Promise = require("bluebird");
const co = require('co');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));

const handler = {
    home: co.wrap(function *(ctx, next) {
        const filepath = path.join(ctx.config.get('template_path'), 'index.html');
        let file = yield fs.readFileAsync(filepath, 'utf8');
        ctx.body = file.toString();
        yield next();
    }),
    afterHome: co.wrap(function *(ctx, next) {
        ctx.body += '<p>233</p>';
        yield next();
    })
};

router.get('/', convert.compose.apply(convert,[handler.home, handler.afterHome]));
// must in babel
// router.get('/', convert.compose(...[handler.home, handler.afterHome]));
module.exports = router;