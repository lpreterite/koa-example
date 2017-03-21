'use strict';

const request = require('supertest');
const app = require('../../src/app');
const server = require('http').createServer(app.callback());

describe('User', function(){
    it('create user', function(done){
        let name = 'Packy'+Date.now();
        let user = {
            email: name+'@uxfeel.com',
            username: name,
            password: '123456'
        };
        request(server)
            .post('/api/users')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(201, done);
    });

    it('get users', function(done){
        request(server)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('get user', function(done){
        request(server)
            .get('/api/users')
            .end((err, res)=>{
                let user = res.body.data.pop();
                request(server)
                    .get('/api/users/'+user.id)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(function(res){
                        if(!res.body.hasOwnProperty('password')) throw new Error('can not has password!');
                    })
                    .expect(200,done);
            });
    });

    it('update user', function(done){
        this.timeout(30000);
        request(server)
            .get('/api/users')
            .end((err, res)=>{
                let user = res.body.data.pop();
                user.password = "654321";
                request(server)
                    .put('/api/users/'+user.id)
                    .send(user)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(done);
            });
    });

    it('update user only sent nicename', function(done){
        this.timeout(30000);
        request(server)
            .get('/api/users')
            .end((err, res)=>{
                let user = res.body.data.pop();
                request(server)
                    .put('/api/users/'+user.id)
                    .send({
                        id: user.id,
                        nicename: user.username
                    })
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(done);
            });
    });

    it('delete user', function(done){
        this.timeout(30000);
        request(server)
            .get('/api/users')
            .end((err, res)=>{
                let user = res.body.data.pop();
                request(server)
                    .del('/api/users/'+user.id)
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
    });

    it.skip('create users', function(done){
        let data = [];
        for (var i = 0; i < 10; i++) {
            let name = 'Packy'+Date.now()+i;
            let user = {
                email: name+'@uxfeel.com',
                username: name,
                password: '123456'
            };
            data.push(user);
        }

        request(server)
            .post('/api/users')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201, done);
    });

});