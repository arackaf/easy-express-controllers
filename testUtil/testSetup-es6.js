var express = require('express');
var app = express();
var assert = require('chai').assert;
var request = require('request');
var bodyParser = require('body-parser');
var expressController = require('../index');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

global.server = app.listen(3000);

global.app = app;
global.request = request;
global.expressController = expressController;
global.easyControllers = expressController.easyControllers;
global.assert = assert;

function postAndCheck(uri, data, done, check, options){
    runAndCheck(uri, data, 'post', done, check);
}

function getAndCheck(uri, data, done, check, options){
    runAndCheck(uri, data, 'get', done, check);
}

function putAndCheck(uri, data, done, check, options){
    runAndCheck(uri, data, 'put', done, check);
}

function deleteAndCheck(uri, data, done, check, options){
    runAndCheck(uri, data, 'delete', done, check);
}

function runAndCheck(uri, data, verb, done, check, options = { }){
    request({
        uri,
        method: verb,
        body: data,
        json: true
    }, function(error, response, obj){
        check(obj);
        done();
    });
}

function verbsAreRejected(uri, done, verbs){
    Promise.all(verbs.map(runVerb)).then(() => done());

    function runVerb(verb){
        return new Promise(res => {
            request[verb](uri, {}, function (error, response, obj) {
                assert.isTrue(new RegExp(`cannot ${verb}`, 'i').test(obj), `${uri} didn't fail for ${verb} but should have`); //this is how request handles requests for which the very is not defined....
                res();
            });
        }).catch(() => null)
    }
}

function checkRoutesAndVerbs(uri, verbs){
    verbs.forEach(verb => {
        it(`routes ${verb} to ${uri.replace('http://localhost:3000', '')}`, function(done){
            utils[`${verb}AndCheck`](uri, {}, done, obj => assert.isTrue(obj.received));
        });
    });
    let badVerbs = ['get', 'post', 'put', 'delete'].filter(verb => verbs.indexOf(verb) === -1);
    it(`rejects ${uri} with [${badVerbs}]`, function(done) {
        utils.verbsAreRejected(uri, done, badVerbs);
    });
}

global.utils = {
    postAndCheck,
    getAndCheck,
    putAndCheck,
    deleteAndCheck,
    runAndCheck,
    verbsAreRejected,
    checkRoutesAndVerbs
};