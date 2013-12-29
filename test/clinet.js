var io = require('socket.io-client');

var socket = io.connect('http://localhost:3001/notification');

socket.on('connect', function(){
    console.log('connect');
    socket.emit('init', { my: 'data' });
});