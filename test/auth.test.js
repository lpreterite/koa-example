'use strict';

const request = require('supertest');
const app = require('../src/app');
const server = require('http').createServer(app.callback());


describe('Auth', function(){
    it('login', function(done){
        request(server)
            .post('/auth/login')
            .set('Accept', 'text/html')
            .send({ username: 'Packy1488272238300', password: '654321' })
            .expect(302)
            .expect(/="\/test"/)
            .end(done);
    });
    it('logout', function(done){
        request(server)
            .get('/auth/logout')
            .set('Accept', 'text/html')
            .expect(302)
            .expect(/="\/"/)
            .end(done);
    });
});