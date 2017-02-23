'use strict';


const Koa = require('koa');
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const responseTime = require('koa-response-time');

const app = new Koa();
app.use(convert(responseTime()));
app.use(convert(bodyparser()));
app.use(convert(logger()));


const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

// socket handle
io.on('connection', socket => {
    console.log('new connection');

    socket.on('message', (data) => {
        console.log('message', data);
    });

    socket.on('disconnect', () => {
        console.log('some one disconnect');
    });

    var i = 0;
    setInterval(function(){
        //当前会话
        socket.emit('message', ++i);
    }, 20000);
});

setInterval(function(){
    //广播
    io.emit('message', '广播');
}, 30000);

server.listen(3331);