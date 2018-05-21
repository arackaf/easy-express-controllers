const { start, stop } = require("../testSetup");

beforeAll(() => {
  start();
});
afterAll(() => {
  stop();
});

describe("Controller routing tests", function() {
  it("routes default get paths", function(done) {
    utils.getAndCheck("http://localhost:3000/person/details", { name: "Adam Get" }, done, obj => expect(obj.name).toBe("Adam"));
  });

  it("rejects default get paths wiht other verbs", function(done) {
    utils.verbsAreRejected("http://localhost:3000/person/details", done, ["post", "put", "delete"]);
  });

  it("routes overriden POST verb", function(done) {
    utils.postAndCheck("http://localhost:3000/person/save", { name: "Adam" }, done, obj => expect(obj.saved).toBe(true));
  });

  it("rejects overriden POST verb with other verbs", function(done) {
    utils.verbsAreRejected("http://localhost:3000/person/save", done, ["get", "put", "delete"]);
  });

  it("sets parameter values for GET", function(done) {
    utils.getAndCheck("http://localhost:3000/person/getStuffA", { a: 1, b: 2, c: 3 }, done, obj => expect(obj).toEqual({ a: 1, b: 2, c: 3 }));
  });

  it("sets parameter values for GET with QueryString", function(done) {
    utils.getAndCheck("http://localhost:3000/person/getStuffA?a=1&b=2&c=3", {}, done, obj => expect(obj).toEqual({ a: "1", b: "2", c: "3" }));
  });

  it("sets parameter values for POST", function(done) {
    utils.postAndCheck("http://localhost:3000/person/setStuffA", { x: 1, y: 2, z: 3 }, done, obj => expect(obj).toEqual({ x: 1, y: 2, z: 3 }));
  });

  it("sets parameter values for POST", function(done) {
    utils.postAndCheck("http://localhost:3000/person/setStuffA", { x: 1, y: 2, z: 3 }, done, obj => expect(obj).toEqual({ x: 1, y: 2, z: 3 }));
  });

  it("routes custom paths", function(done) {
    utils.getAndCheck("http://localhost:3000/person/x/y/z", {}, done, obj => expect(obj.madeIt).toBe(true));
  });

  it("rejects default paths for overridden routes", function(done) {
    utils.verbsAreRejected("http://localhost:3000/person/customPathBasic", done, ["get", "post", "put", "delete"]);
  });

  it("routes custom paths with parameters passed", function(done) {
    utils.getAndCheck("http://localhost:3000/person/x/12/z/13", {}, done, obj => expect(obj).toEqual({ userId: "12", parentId: "13" }));
  });

  it("routes custom paths with parameters passed", function(done) {
    utils.getAndCheck("http://localhost:3000/person/x2/12/z2/13", {}, done, obj => expect(obj).toEqual({ userId: "12", parentId: "13" }));
  });

  it("routes custom paths with parameters passed precedence 1", function(done) {
    utils.getAndCheck("http://localhost:3000/person/x2/12/z2/13", { userId: 99 }, done, obj => expect(obj).toEqual({ userId: "12", parentId: "13" }));
  });

  it("routes custom paths with parameters passed precedence 2", function(done) {
    utils.getAndCheck("http://localhost:3000/person/x2/12/z2/13?userId=98", { userId: 99 }, done, obj =>
      expect(obj).toEqual({ userId: "12", parentId: "13" })
    );
  });

  it("posts to custom paths", function(done) {
    utils.postAndCheck("http://localhost:3000/person/z/x", {}, done, obj => expect(obj.received).toBe(true));
  });

  it("posts to custom paths with attributes", function(done) {
    utils.postAndCheck("http://localhost:3000/person/z/6/x/5", {}, done, obj => expect(obj).toEqual({ a: "6", b: "5" }));
  });

  it("posts to custom paths with attributes and body params", function(done) {
    utils.postAndCheck("http://localhost:3000/person/z/6/x/5", { c: 4 }, done, obj => expect(obj).toEqual({ a: "6", b: "5", c: 4 }));
  });

  it("posts to custom paths with attributes in other order", function(done) {
    utils.postAndCheck("http://localhost:3000/person/z/xx", {}, done, obj => expect(obj.received).toBe(true));
  });

  it("rejects default paths for non-routeable action", function(done) {
    utils.verbsAreRejected("http://localhost:3000/person/dontTouchMe", done, ["get", "post", "put", "delete"]);
  });

  utils.checkRoutesAndVerbs("http://localhost:3000/person/getOrPostToMe", ["get", "post"]);
  utils.checkRoutesAndVerbs("http://localhost:3000/person/getOrPostToMe2", ["get", "post"]);
  utils.checkRoutesAndVerbs("http://localhost:3000/person/putOrDeleteToMe", ["put", "delete"]);
  utils.checkRoutesAndVerbs("http://localhost:3000/person/putOrDeleteToMe2", ["put", "delete"]);
  utils.checkRoutesAndVerbs("http://localhost:3000/person/postPutOrDeleteToMe", ["post", "put", "delete"]);
  utils.checkRoutesAndVerbs("http://localhost:3000/person/postPutOrDeleteToMe2", ["post", "put", "delete"]);
  utils.checkRoutesAndVerbs("http://localhost:3000/person/postPutOrDeleteToMe3", ["post", "put", "delete"]);
  utils.checkRoutesAndVerbs("http://localhost:3000/person/postPutOrDeleteToMeReversedDecorators", ["post", "put", "delete"]);

  utils.checkRoutesAndVerbs("http://localhost:3000/person/putToMe", ["put"]);
  utils.checkRoutesAndVerbs("http://localhost:3000/person/putToMe2", ["put"]);
  utils.checkRoutesAndVerbs("http://localhost:3000/person/deleteToMe", ["delete"]);

  it("routes to a default route name", function(done) {
    utils.getAndCheck("http://localhost:3000/NewRouting/", {}, done, obj => expect(obj.getReceived).toBe(true));
  });

  it("posts to a conventional route name", function(done) {
    utils.postAndCheck("http://localhost:3000/NewRouting/", {}, done, obj => expect(obj.postReceived).toBe(true));
  });

  it("puts to a default route name", function(done) {
    utils.putAndCheck("http://localhost:3000/NewRouting/", {}, done, obj => expect(obj.putReceivedXyz).toBe(true));
  });

  it("rejects conventional verb when verb is manually specified", function(done) {
    utils.verbsAreRejected("http://localhost:3000/NewRouting/delete", done, ["get", "put", "delete"]);
  });

  it("overridden conventional route name", function(done) {
    utils.postAndCheck("http://localhost:3000/NewRouting/delete", {}, done, obj => expect(obj.deleteReceived).toBe(true));
  });

  it("routes to a regular route name", function(done) {
    utils.getAndCheck("http://localhost:3000/NewRouting/foo", {}, done, obj => expect(obj.fooReceived).toBe(true));
  });

  //all default conventional routes

  it("all defaults - get", function(done) {
    utils.getAndCheck("http://localhost:3000/NewRouting2/", {}, done, obj => expect(obj.getReceived).toBe(true));
  });

  it("all defaults - post", function(done) {
    utils.postAndCheck("http://localhost:3000/NewRouting2/", {}, done, obj => expect(obj.postReceived).toBe(true));
  });

  it("all defaults - delete", function(done) {
    utils.deleteAndCheck("http://localhost:3000/NewRouting2/", {}, done, obj => expect(obj.deleteReceived).toBe(true));
  });

  it("all defaults - put", function(done) {
    utils.putAndCheck("http://localhost:3000/NewRouting2/", {}, done, obj => expect(obj.putReceived).toBe(true));
  });

  //all default conventional routes

  it("all defaults overridden - get", function(done) {
    utils.getAndCheck("http://localhost:3000/NewRouting3/", {}, done, obj => expect(obj.getReceived).toBe(true));
  });

  it("all defaults overridden - post", function(done) {
    utils.postAndCheck("http://localhost:3000/NewRouting3/", {}, done, obj => expect(obj.postReceived).toBe(true));
  });

  it("all defaults overridden - delete", function(done) {
    utils.deleteAndCheck("http://localhost:3000/NewRouting3/", {}, done, obj => expect(obj.deleteReceived).toBe(true));
  });

  it("all defaults overridden - put", function(done) {
    utils.putAndCheck("http://localhost:3000/NewRouting3/", {}, done, obj => expect(obj.putReceived).toBe(true));
  });

  //exteneded decorators

  it("exteneded decorators - get", function(done) {
    utils.getAndCheck("http://localhost:3000/ExtendedDecorators/get-test", {}, done, obj => expect(obj.getReceived).toBe(true));
  });

  it("exteneded decorators - post", function(done) {
    utils.postAndCheck("http://localhost:3000/ExtendedDecorators/post-test", {}, done, obj => expect(obj.postReceived).toBe(true));
  });

  it("exteneded decorators - delete", function(done) {
    utils.deleteAndCheck("http://localhost:3000/ExtendedDecorators/delete-test", {}, done, obj => expect(obj.deleteReceived).toBe(true));
  });

  it("exteneded decorators - put", function(done) {
    utils.putAndCheck("http://localhost:3000/ExtendedDecorators/put-test", {}, done, obj => expect(obj.putReceived).toBe(true));
  });

  it("exteneded decorators - patch", function(done) {
    utils.patchAndCheck("http://localhost:3000/ExtendedDecorators/patch-test", {}, done, obj => expect(obj.patchReceived).toBe(true));
  });

  it("exteneded decorators - empty route", function(done) {
    utils.postAndCheck("http://localhost:3000/ExtendedDecorators", {}, done, obj => expect(obj.postReceived).toBe(true));
  });
});
