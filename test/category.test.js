'use strict';

const request = require('supertest');
const app = require('../src/app');
const server = require('http').createServer(app.callback());

describe('Category', function(){
    it('create category', function(done){
        const category = {
            name: 'Test'
        };
        request(server)
            .post('/api/category')
            .send(category)
            .expect('Content-Type', /json/)
            .expect(201, done);
    });

    it('get categories', function(done){
        request(server)
            .get('/api/category')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('get category', function(done){
        request(server)
            .get('/api/category')
            .end((err, res)=>{
                let category = res.body.data.pop();
                request(server)
                    .get('/api/category/'+category.id)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(function(res){
                        if(!res.body.hasOwnProperty('password')) throw new Error('can not has password!');
                    })
                    .expect(200,done);
            });
    });

    it('update category', function(done){
        this.timeout(30000);
        request(server)
            .get('/api/category')
            .end((err, res)=>{
                let user = res.body.data.pop();
                user.name = "Test111";
                request(server)
                    .put('/api/category/'+user.id)
                    .send(user)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res=>{
                        if(res.body.name !== "Test111") throw new Error('update error');
                    })
                    .end(done);
            });
    });

    it('delete user', function(done){
        this.timeout(30000);
        request(server)
            .get('/api/category')
            .end((err, res)=>{
                let user = res.body.data.pop();
                request(server)
                    .del('/api/category/'+user.id)
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
    });
});