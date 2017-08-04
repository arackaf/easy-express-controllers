'use strict';

var createController = require('./util/createController');
var createAllControllers = require('./util/createAllControllers');

var _require = require('./util/decorators'),
    controller = _require.controller,
    httpGet = _require.httpGet,
    httpPost = _require.httpPost,
    httpPut = _require.httpPut,
    httpDelete = _require.httpDelete,
    acceptVerbs = _require.acceptVerbs,
    route = _require.route,
    nonRoutable = _require.nonRoutable;

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