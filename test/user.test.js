'use strict';

const request = require('supertest');
const app = require('../src/app');
const server = require('http').createServer(app.callback());

describe('User', ()=>{
    it('get users', (done)=>{
        request(server)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('get user', (done)=>{
        request(server)
            .get('/api/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200,done);
    });

    it('create user', (done)=>{
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


    it.skip('create users', (done)=>{
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