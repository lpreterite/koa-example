'use strict';

const R = require('ramda');
const co = require('co');

exports.remove = function(attrName){
    return co.wrap(function *(ctx, next){
        if(ctx.body.hasOwnProperty('data') && ctx.body.data.constructor === Array)
            ctx.body.data = R.map(R.dissoc(attrName))(ctx.body.data);
        else
            ctx.body.data = R.dissoc(attrName);

        yield next();
    });
};