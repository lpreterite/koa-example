'use strict';

const co = require('co');
const auth = require('../middlewares/auth');
const app = require('../../src/app');
const server = require('http').createServer(app.callback());
const request = require('supertest')(server);

describe('Category', function(){

    let user,token;

    before(co.wrap(function *(){
        user = yield auth.createUser();
        token = yield auth.getToken(request, user.username);
    }));

    after(co.wrap(function *(){
        yield auth.removeUser();
        yield auth.logout(request);
    }));

    it('create category', function(done){
        const category = {
            name: 'Test'
        };
        request
            .post('/api/category')
            .set('Authorization','Bearer ' + token)
            .send(category)
            .expect('Content-Type', /json/)
            .expect(201, done);
    });

    it('get categories', function(done){
        request
            .get('/api/category')
            .set('Authorization','Bearer ' + token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('get category', function(done){
        request
            .get('/api/category')
            .set('Authorization','Bearer ' + token)
            .end((err, res)=>{
                let category = res.body.data.pop();
                request
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
        request
            .get('/api/category')
            .set('Authorization','Bearer ' + token)
            .end((err, res)=>{
                let user = res.body.data.pop();
                user.name = "Test111";
                request
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
        request
            .get('/api/category')
            .set('Authorization','Bearer ' + token)
            .end((err, res)=>{
                let user = res.body.data.pop();
                request
                    .del('/api/category/'+user.id)
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
    });
});