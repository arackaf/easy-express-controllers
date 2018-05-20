var createController = require('./util/createController');
var createAllControllers = require('./util/createAllControllers');
var {
    controller,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    httpPatch,
    acceptVerbs,
    route,
    nonRoutable
} = require('./util/decorators');

var easyControllers = {
    createController,
    createAllControllers
};

module.exports = {
    createController,
    createAllControllers,    
    easyControllers,
    controller,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    httpPatch,
    acceptVerbs,
    route,
    nonRoutable
};