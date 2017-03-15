'use strict';

const co = require('co');

exports.remove = function(attrName){
    return co.wrap(function *(ctx, next){
        if(ctx.body.hasOwnProperty('data') && ctx.body.data.constructor === Array)
            ctx.body.data = ctx.body.data.map(item => {
                delete item[attrName];
                return item;
            });
        else
            delete ctx.body[attrName];

        yield next();
    });
};