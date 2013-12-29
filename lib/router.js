exports._routes = {};

exports.get = function(urlPattern, callback){
    
    var uri = urlPattern.split('/');
    var namespace = uri[0];
    var action = uri[1] || 'index';

    if(this._routes[namespace] == undefined){
        this._routes[namespace] = {};
    }

    this._routes[namespace][action] = callback;
}