'use strict';

const request = require('supertest');
const app = require('../src/app');
const server = require('http').createServer(app.callback());

let agent = request.agent(server),
    token = null;

describe('Auth', function(){

    it('No authorization', function(done){
        agent
            .get('/test')
            .set('Accept', 'text/html')
            .expect(401, done);
    });
    it('login', function(done){
        agent
            .post('/auth/login')
            .set('Accept', 'text/html')
            .send({ username: 'Packy1488272238300', password: '654321' })
            .expect(200, /授权成功/)
            .expect(function(res){
                token = res.body.token;
            })
            .end(done);
    });
    it('cookie Authenticated', function(done){
        agent
            .get('/test')
            .set('Accept', 'text/html')
            .expect(200, done);
    });
    it('token Authenticated', function(done){
        agent
            .get('/api/users')
            .set('Accept', 'text/html')
            .set('Authorization', 'Bearer '+token)
            .expect(200, done);
    });
    it('logout', function(done){
        agent
            .get('/auth/logout')
            .set('Accept', 'text/html')
            .expect(200, /成功登出/, done);
    });

    it('No authorization', function(done){
        agent
            .get('/test')
            .set('Accept', 'text/html')
            .expect(401, done);
    });
});