var express = require("express");
var assert = require("chai").assert;
var request = require("request");
var bodyParser = require("body-parser");
var expressController = require("../index");
var cors = require("cors");
var app;

function start() {
  app = express();
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(
    bodyParser.urlencoded({
      // to support URL-encoded bodies
      extended: true
    })
  );
  app.use(cors());

  global.server = app.listen(3000);

  global.app = app;
  global.request = request;
  global.expressController = expressController;
  global.assert = assert;
  global.easyControllers = expressController.easyControllers;
  easyControllers.createController(app, "books/Foo", { __dirname: __dirname, controllerPath: "../controllers2" });
  easyControllers.createController(app, "Person");
  easyControllers.createController(app, "NewRouting");
  easyControllers.createController(app, "NewRouting2");
  easyControllers.createController(app, "NewRouting3");
  easyControllers.createController(app, "ExtendedDecorators");
  easyControllers.createController(app, "GlobalController");
  easyControllers.createController(app, "publisher/publisherDetails");
  easyControllers.createController(app, "books/Book");
  easyControllers.createController(app, "books/BookDefaultPost");
}

function stop() {
  global.server.close();
}
//forcing a different root __dirname and custom path to controllers directory

function postAndCheck(uri, data, done, check, options) {
  runAndCheck(uri, data, "post", done, check);
}

function getAndCheck(uri, data, done, check, options) {
  runAndCheck(uri, data, "get", done, check);
}

function putAndCheck(uri, data, done, check, options) {
  runAndCheck(uri, data, "put", done, check);
}

function patchAndCheck(uri, data, done, check, options) {
  runAndCheck(uri, data, "patch", done, check);
}

function deleteAndCheck(uri, data, done, check, options) {
  runAndCheck(uri, data, "delete", done, check);
}

function runAndCheck(uri, data, verb, done, check, options = {}) {
  request(
    {
      uri,
      method: verb,
      body: data,
      json: true
    },
    function(error, response, obj) {
      check(obj);
      done();
    }
  );
}

function verbsAreRejected(uri, done, verbs) {
  Promise.all(verbs.map(runVerb)).then(() => done());

  function runVerb(verb) {
    return new Promise(res => {
      let regVerb = verb;
      if (regVerb == "delete") regVerb = "del";

      request[regVerb](uri, {}, function(error, response, obj) {
        assert.isTrue(new RegExp(`cannot ${verb}`, "i").test(obj), `${uri} didn't fail for ${verb} but should have`); //this is how request handles requests for which the very is not defined....
        res();
      });
    }).catch(() => null);
  }
}

function checkRoutesAndVerbs(uri, verbs) {
  verbs.forEach(verb => {
    it(`routes ${verb} to ${uri.replace("http://localhost:3000", "")}`, function(done) {
      utils[`${verb}AndCheck`](uri, {}, done, obj => assert.isTrue(obj.received));
    });
  });
  let badVerbs = ["get", "post", "put", "delete"].filter(verb => verbs.indexOf(verb) === -1);
  it(`rejects ${uri} with [${badVerbs}]`, function(done) {
    utils.verbsAreRejected(uri, done, badVerbs);
  });
}

function shallowObjEqual(obj1, obj2) {
  if (obj1 == null && obj2 == null) return true;

  let keys1 = Object.keys(obj1),
    keys2 = Object.keys(obj2);

  return keys1.length == keys2.length && keys1.every(k => obj1[k] == obj2[k]);
}

function verifyCreateControllerSpyCalls(spy, calls) {
  assert.equal(spy.callCount, calls.length, "total count wrong");
  let callsToVerify = calls.map((c, i) => spy.getCall(i));

  assert.isFalse(callsToVerify.some(c => c.args[0] !== app), "Some calls missing app param");

  //I don't pass the app value in for all calls to verify, so the args are shifted
  callsToVerify.forEach(spyCall =>
    assert.equal(
      1,
      calls.filter(callToVerify => callToVerify[0] == spyCall.args[1] && shallowObjEqual(callToVerify[1], spyCall.args[2])).length,
      `Missing call for ${spyCall.args[1]}`
    )
  );
}

global.utils = {
  postAndCheck,
  getAndCheck,
  putAndCheck,
  patchAndCheck,
  deleteAndCheck,
  runAndCheck,
  verbsAreRejected,
  checkRoutesAndVerbs,
  verifyCreateControllerSpyCalls
};

module.exports = {
  start,
  stop
};
