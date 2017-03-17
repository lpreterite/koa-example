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

exports.include = function(models){
    if(models.constructor !== Array){
        throw new Error('models must be Array');
    }

    return co.wrap(function *(ctx, next){

        if(!ctx.params.sequelize){
            ctx.params.sequelize = {include: []};
        }

        const include = models.map(function(item){
            const result = typeof item.as === 'undefined' ? ctx.sequelize.models[item.model] : {model: ctx.sequelize.models[item.model], as: item.as};
            return result;
        });

        ctx.params.sequelize.include = include.concat(ctx.params.sequelize.include);

        yield next();
    });
};