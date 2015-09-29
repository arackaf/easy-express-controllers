"use strict";

var http = require("http");
var express = require('express');
var app = express();
var path = require("path");
var assert = require('chai').assert;
var request = require('request');
var bodyParser = require('body-parser');
var expressController = require('../expressController');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.listen(3000);

var manualGet = undefined,
    manualPost = undefined;

app.get('/manualGet', function (request, response) {
    response.send({ result: 'Success', x: request.body.x });
});

app.post('/manualPost', function (request, response) {
    response.send({ result: 'Success', x: request.body.x });
});

describe('Manual http packets work', function () {

    it('gets properly', function (done) {
        request.get('http://localhost:3000/manualGet', { form: { x: 12 } }, function (error, response, obj) {
            obj = JSON.parse(obj);
            assert.equal('Success', obj.result);
            assert.equal(12, obj.x);
            done();
        });
    });

    it('posts properly', function (done) {
        request.post('http://localhost:3000/manualPost', { form: { x: 12 } }, function (error, response, obj) {
            obj = JSON.parse(obj);

            assert.equal('Success', obj.result);
            assert.equal(12, obj.x);
            done();
        });
    });

    it('routes default get paths', function (done) {
        expressController.createController(app, 'person');

        request.get('http://localhost:3000/person/details', {}, function (error, response, obj) {
            obj = JSON.parse(obj);
            assert.equal('Adam', obj.name);
            done();
        });
    });

    it('routes overriden POST paths', function (done) {
        expressController.createController(app, 'person');

        request.post('http://localhost:3000/person/save', {}, function (error, response, obj) {
            obj = JSON.parse(obj);
            assert.isTrue(true, obj.saved);
            done();
        });
    });
});