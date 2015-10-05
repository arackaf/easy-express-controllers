'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var extend = require('extend');

var _require = require('./parameterSniffer');

var getParameterNames = _require.getParameterNames;

var path = require('path');

function createController(app, controllerPath) {
    var router = require('express').Router(),
        classBasePath = path.relative(__dirname, path.resolve(path.dirname(require.main), "controllers")).replace(/\\/g, '/'),
        classDec = require(classBasePath + '/' + controllerPath),
        routeOverrides = classDec.routeOverrides || {},
        controllerSettings = classDec.controllerSettings || {};

    Object.getOwnPropertyNames(classDec.prototype).forEach(function (method) {
        if (method === 'constructor' || typeof classDec.prototype[method] !== 'function') return;

        var methodOverrides = routeOverrides[method] || {};

        if (methodOverrides.nonRoutable) return;

        var verbsToUse = methodOverrides.httpMethod || ['get'],
            parameterNames = getParameterNames(classDec.prototype[method]),
            actionPath = methodOverrides.route || method;

        if (actionPath[0] == '/') {
            //global path - add right to express
            verbsToUse.forEach(function (verb) {
                return app[verb](actionPath, createRouteCallback(classDec, method, parameterNames));
            });
        } else {
            //normal path - add to the router
            verbsToUse.forEach(function (verb) {
                return router[verb]('/' + actionPath, createRouteCallback(classDec, method, parameterNames));
            });
        }
    });

    app.use('/' + (controllerSettings.path || controllerPath), router);
}

function createRouteCallback(classDec, method, parameterNames) {
    return function (req, res) {
        var _getRequestValues = getRequestValues(req);

        var allRequestValues = _getRequestValues.allRequestValues;
        var body = _getRequestValues.body;
        var query = _getRequestValues.query;
        var params = _getRequestValues.params;
        var parameterValues = parameterNames.map(function (name) {
            return caseInsensitiveLookup(name, body, query, params);
        });

        var obj = new classDec();
        obj.request = req;
        obj.response = res;
        ['send', 'sendFile', 'json', 'jsonp'].forEach(function (m) {
            return obj[m] = res[m].bind(res);
        });
        obj[method].apply(obj, _toConsumableArray(parameterValues));
    };
}

function getRequestValues(req) {
    var body = typeof req.body === 'object' ? req.body : {},
        query = typeof req.query === 'object' ? req.query : {},
        params = typeof req.params === 'object' ? req.params : {};

    return { requestValues: extend({}, body, query, params), body: body, query: query, params: params };
}

function caseInsensitiveLookup(name, body, query, params) {
    return getValue(params) || getValue(query) || getValue(body);

    function getValue(checkingObject) {
        var keys = Object.keys(checkingObject);
        for (var i = 0; i < keys.length; i++) {
            if (name.toLowerCase() == keys[i].toLowerCase()) {
                return checkingObject[keys[i]];
            }
        }
    }
}

module.exports = createController;