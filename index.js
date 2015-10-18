'use strict';

var createController = require('./util/createController');
var createAllControllers = require('./util/createAllControllers');

var _require = require('./util/decorators');

var controller = _require.controller;
var httpGet = _require.httpGet;
var httpPost = _require.httpPost;
var httpPut = _require.httpPut;
var httpDelete = _require.httpDelete;
var acceptVerbs = _require.acceptVerbs;
var route = _require.route;
var nonRoutable = _require.nonRoutable;

var easyControllers = {
    createController: createController,
    createAllControllers: createAllControllers
};

module.exports = {
    easyControllers: easyControllers,
    controller: controller,
    httpGet: httpGet,
    httpPost: httpPost,
    httpPut: httpPut,
    httpDelete: httpDelete,
    acceptVerbs: acceptVerbs,
    route: route,
    nonRoutable: nonRoutable
};