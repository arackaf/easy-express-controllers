const { start, stop } = require("./testSetup");

beforeAll(() => {
  start();
});
afterAll(() => {
  stop();
});

describe("Nested routes tests", function() {
  it("routes default get paths", function(done) {
    utils.getAndCheck("http://localhost:3000/books/foo/details", {}, done, obj => expect(obj.received).toBe(true));
  });

  it("rejects default get paths that was overridden", function(done) {
    utils.verbsAreRejected("http://localhost:3000/books/foo/details", done, ["post", "put", "delete"]);
  });

  it("handles parameters correctly on an overridden global path C", function(done) {
    utils.postAndCheck("http://localhost:3000/global-path-foo/15?x=1", { y: 2 }, done, obj => expect(obj).toEqual({ x: "1", y: 2, userId: "15" }));
  });

  it("rejects opted-in verbs on original paths that was overridden ", function(done) {
    utils.verbsAreRejected("http://localhost:3000/global-path-foo/12", done, ["get", "put", "delete"]);
  });
});
