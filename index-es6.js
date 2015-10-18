var createController = require('./util/createController');
var createAllControllers = require('./util/createAllControllers');
var {
    controller,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    acceptVerbs,
    route,
    nonRoutable
} = require('./util/decorators');

var easyControllers = {
    createController,
    createAllControllers
};

module.exports = {
    easyControllers,
    controller,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    acceptVerbs,
    route,
    nonRoutable
};