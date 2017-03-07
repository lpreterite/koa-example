'use strict';

const Koa = require('koa');
const config = require('config');
const bodyparser = require('koa-bodyparser');
const convert = require('koa-convert');
const logger = require('koa-logger');
const cors = require('kcors');
const responseTime = require('koa-response-time');
const json = require('koa-json');
const session = require('koa-generic-session');

const app = new Koa();
// ENV
const SECRET = process.env.SECRET || config.get('secret');

app.use(convert(cors()));
app.use(convert(responseTime()));
app.use(convert(bodyparser()));
app.use(convert(json()));
app.use(convert(logger()));
app.keys = [SECRET];
app.use(convert(session()));
app.use(convert(require('koa-static')(config.get('public_path'))));

//初次化 令牌控制
require('./auth')(app);
require('./services')(app, config);
require('./views')(app);

module.exports = app;