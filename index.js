var createController = require("./src/createController");
var createAllControllers = require("./src/createAllControllers");
var { controller, httpGet, httpPost, httpPut, httpDelete, httpPatch, acceptVerbs, route, nonRoutable } = require("./src/decorators");

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
