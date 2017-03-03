'use strict';

const co = require('co');

function configure(funs){
    return co.wrap(funs);
}

module.exports = 
    Object.assign(
        {configure},
        require('./orm')
        // , require('./commons')
    );
