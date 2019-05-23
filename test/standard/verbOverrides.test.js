const { start, stop } = require("../testSetup");

beforeAll(() => {
  start();
});
afterAll(() => {
  stop();
});

describe("Verb override tests", function() {
  it("routes default post paths", function(done) {
    utils.postAndCheck("http://localhost:3000/books/bookDefaultPost/details", {}, done, obj => expect(obj.received).toBe(true));
  });

  it("rejects default get paths that was overridden", function(done) {
    utils.verbsAreRejected("http://localhost:3000/books/bookDefaultPost/details", done, ["get", "put", "delete"]);
  });

  it("explicit posts still work", function(done) {
    utils.postAndCheck("http://localhost:3000/books/bookDefaultPost/foo", { x: 1 }, done, obj => expect(+obj.x).toBe(1));
  });

  it("explicit posts 2", function(done) {
    utils.verbsAreRejected("http://localhost:3000/books/bookDefaultPost/foo", done, ["get", "put", "delete"]);
  });

  it("explicit gets still work", function(done) {
    utils.getAndCheck("http://localhost:3000/books/bookDefaultPost/foo2", { x: 1 }, done, obj => expect(+obj.x).toBe(1, +obj.x));
  });

  it("explicit gets still work", function(done) {
    utils.verbsAreRejected("http://localhost:3000/books/bookDefaultPost/foo2", done, ["post", "put", "delete"]);
  });
});
