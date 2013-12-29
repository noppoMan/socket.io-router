var _ = require('underscore');

_.extend(this, 
    require('./lib/io_wrapper')
    , require('./lib/router')
);

module.exports = this;