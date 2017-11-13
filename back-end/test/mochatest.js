var request = require('request'), express = require('express'), assert = require("assert"), http = require("http");

describe('http tests', function() {


    it('login success', function (done) {
        request.post('http://localhost:3001/login', {
            headers: {'Content-Type': 'application/json'}, credentials: 'include',
            form: {
                username: 'pooja@gmail.com',
                password: 'pooja'
            }
        }, function (error, res, body) {

            assert.equal(201, res.statusCode);
            done();
        });
    });
    it('login failure', function (done) {
        request.post('http://localhost:3001/login', {
            headers: {'Content-Type': 'application/json'}, credentials: 'include',
            form: {
                username: 'pooja@gmail.com',
                password: 'p'
            }
        }, function (error, response, body) {
            assert.equal(401, response.statusCode);
            done();
        });
    });
    
});