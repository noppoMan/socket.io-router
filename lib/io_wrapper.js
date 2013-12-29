var sio = require('socket.io');
var dispatcher = require('./dispatcher');

exports.listen = function(server){
    var io = sio.listen(server);
    exports.io = io;
    dispatcher.dispatch();
}