'use strict';

const co = require('co');
const hooks = require('./hooks');

function configure(funs){
    return co.wrap(funs);
}

module.exports = 
    Object.assign(
        {configure},
        {hooks}
    );
