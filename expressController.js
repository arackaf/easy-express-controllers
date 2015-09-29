'use strict';

function createController(app, path) {
    var router = require('express').Router();

    var classDec = require('./controllers/' + path);
    var overrides = classDec.routeOverrides || {};

    Object.getOwnPropertyNames(classDec.prototype).forEach(function (method) {
        if (method === 'constructor' || typeof classDec.prototype[method] !== 'function') return;

        router[overrides[method] && overrides[method].httpMethod || 'get']('/' + method, function (req, res) {
            var obj = new classDec();
            obj.request = req;
            obj.response = res;
            obj.send = res.send.bind(res);
            obj[method]();
        });
    });

    app.use('/' + path, router);
}

function httpPost(target, name, decorator) {
    if (!target.constructor.routeOverrides) {
        target.constructor.routeOverrides = {};
    }
    target.constructor.routeOverrides[name] = {
        httpMethod: 'post'
    };
}

global.httpPost = httpPost;

module.exports = {
    createController: createController
};