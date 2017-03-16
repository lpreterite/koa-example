'use strict';

const db = require('../../migrations/models');
const should = require('chai').should();

db.sequelize.sync();

exports.createUser = function(){
    let name = 'Test'+Date.now();
    return db.models.users.create({
        email: name+'@uxfeel.com',
        password: '123456',
        username: name,
        nicename: name
    }).then(instance=>instance.toJSON());
};

exports.getToken = function(request, username){
    return new Promise(function(resolve, reject){
        request
            .post('/auth/login')
            .set("Content-Type", "application/json")
            .send({username: username, password: '123456'})
            .expect(200)
            .end(function(err, res){
                if(err) reject(err);
                should.exist(res.body);
                should.exist(res.body.token);
                resolve(res.body.token);
            });
    });
};

exports.logout = function(request){
    return new Promise(function(resolve, reject){
        request
            .get('/auth/logout')
            .end(function(err, res){
                if(err) reject(err);
                resolve(res.body);
            });
    });
};

exports.removeUser = function(id){
    return db.models.users.destroy({
        where: {id: id},
        truncate:true
    });
};