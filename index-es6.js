var createController = require('./util/createController');
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
    createController
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