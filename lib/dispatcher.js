var iow = require('./io_wrapper')
, router = require('./router')
, _ = require('underscore')
;

function dispatch(acitons, client, socket){
    _.each(acitons, function(fn, action){
        socket.on(action, function(req){
            var res = {
              socket: socket,
              client: client
            };
            fn(req, res);
        })
    });
}

exports.dispatch = function(){
    _.each(router._routes, function(acitons, namespace){
        var client = iow
        .io
        .of('/'+namespace)
        .on("connection", dispatch.bind(null, acitons, client));
    });
}
