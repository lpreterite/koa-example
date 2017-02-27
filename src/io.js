'use strict';

const server = require('http').createServer();
const io = require('socket.io')(server);
const PORT = 3331;

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

server.listen(PORT);

console.log('Server listening on port: ', PORT);