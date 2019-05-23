const { start, stop } = require("../testSetup");

beforeAll(() => {
  start();
});
afterAll(() => {
  stop();
});

describe("Nested routes tests", function() {
  it("routes default get paths when controller path overridden", function(done) {
    utils.getAndCheck("http://localhost:3000/publisher/details", {}, done, obj => expect(obj.received).toBe(true));
  });

  it("rejects default controller path", function(done) {
    utils.verbsAreRejected("http://localhost:3000/publisher/publisherDetails/details", done, ["get", "post", "put", "delete"]);
  });

  it("handles parameters correctly on an overridden global path A", function(done) {
    utils.postAndCheck("http://localhost:3000/global-path-publisher/15?x=1", { y: 2 }, done, obj =>
      expect(obj).toEqual({ x: "1", y: 2, userId: "15" })
    );
  });

  it("rejects opted-in verbs on original paths that was overridden ", function(done) {
    utils.verbsAreRejected("http://localhost:3000/global-path-publisher/12", done, ["get", "put", "delete"]);
  });
});
