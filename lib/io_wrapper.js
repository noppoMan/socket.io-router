var sio = require('socket.io')
, router = require('./router')
, _ = require('underscore')
, EventEmitter = require('events').EventEmitter
, util = require('util')
;

var io;


//EventEmitter Wrapper
function EventHandler(){
    EventEmitter.call(this);
}
util.inherits(EventHandler, EventEmitter);

var evh = new EventHandler();

exports.switchStore = function(){

}

exports.shareSession = function(sessionName){

    function onListen(){

        var cookie = require('cookie');

        var parseCookie = function(cookieStr){
            return cookie.parse(cookieStr);
        }

        io.configure(function () {
            io.set('authorization', function (handshakeData, cb) {
                
                if(!handshakeData.headers.cookie)
                    return cb('No cookie transmited from client.', false);

                var sessionID = parseCookie(handshakeData.headers.cookie)[sessionName];
                handshakeData.sessionID = sessionID;
                cb(null, true);
            });
        });
    }

    evh.on('listen',onListen);

    return this;
}

exports.listen = function(server){
    module.exports = this;

    io = sio.listen(server);
    evh.emit('listen');

    _.each(router._routes, function(acitons, namespace){
        var client = io.of('/'+namespace).on("connection", function(socket){
            _.each(acitons, function(fn, action){
                socket.on(action, function(req){
                    var res = {
                        socket: socket,
                        client: client
                    };
                    fn(req, res);
                });
            });
        });
    });

    return this;
}