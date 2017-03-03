'use strict';

const compose = require('koa-convert').compose;
const router = require('koa-router')();
const Promise = require("bluebird");
const co = require('co');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));

const handler = {
    home: co.wrap(function *(ctx, next) {
        const filepath = path.join(ctx.config.get('template_path'), 'test.html');
        ctx.body = fs.createReadStream(filepath);
        yield next();
    })
};

router.get('/', compose([handler.home]));
// must in babel
// router.get('/', convert.compose(...[handler.home, handler.afterHome]));
module.exports = router;