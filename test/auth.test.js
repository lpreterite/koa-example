'use strict';

const request = require('supertest');
const app = require('../src/app');
const server = require('http').createServer(app.callback());

let agent = request.agent(server);

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
            .expect(302)
            .expect(/="\/test"/)
            .end(done);
    });
    it('Authenticated', function(done){
        agent
            .get('/test')
            .set('Accept', 'text/html')
            .expect(200, done);
    });
    it('logout', function(done){
        agent
            .get('/auth/logout')
            .set('Accept', 'text/html')
            .expect(302)
            .expect(/="\/"/)
            .end(done);
    });

    it('No authorization', function(done){
        agent
            .get('/test')
            .set('Accept', 'text/html')
            .expect(401, done);
    });
});