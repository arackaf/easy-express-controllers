const { start, stop } = require("./testSetup");

beforeAll(() => {
  start();
});
afterAll(() => {
  stop();
});

describe("Advanced routing tests", function() {
  it("routes default get paths", function(done) {
    utils.getAndCheck("http://localhost:3000/globalRoute1", {}, done, obj => expect(obj.received).toBe(true));
  });

  it("rejects default get paths that was overridden", function(done) {
    utils.verbsAreRejected("http://localhost:3000/globalcontroller/foo", done, ["get"]);
  });

  utils.checkRoutesAndVerbs("http://localhost:3000/globalRoute2", ["post", "put"]);

  it("rejects default get paths that was overridden 2", function(done) {
    utils.verbsAreRejected("http://localhost:3000/globalcontroller/foo", done, ["get"]);
  });

  it("rejects opted-in verbs on original paths that was overridden", function(done) {
    utils.verbsAreRejected("http://localhost:3000/globalcontroller/lala", done, ["get", "post", "put", "delete"]);
  });

  it("rejects opted-in verbs on original paths that was overridden 2", function(done) {
    utils.verbsAreRejected("http://localhost:3000/globalcontroller/lolo", done, ["get", "post", "put", "delete"]);
  });
});
