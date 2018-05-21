const { start, stop } = require("./testSetup");

beforeAll(() => {
  start();
});
afterAll(() => {
  stop();
});

describe("Manual http packets work", function() {
  beforeAll(function() {
    app.get("/manualGet", function(request, response) {
      response.send({ result: "Success", x: request.body.x });
    });

    app.post("/manualPost", function(request, response) {
      response.send({ result: "Success", x: request.body.x });
    });
  });

  it("gets properly", function(done) {
    request.get("http://localhost:3000/manualGet", { form: { x: 12 } }, function(error, response, obj) {
      obj = JSON.parse(obj);
      expect(obj.result).toEqual("Success");
      expect(+obj.x).toBe(12);
      done();
    });
  });

  it("posts properly", function(done) {
    request.post("http://localhost:3000/manualPost", { form: { x: 12 } }, function(error, response, obj) {
      obj = JSON.parse(obj);

      expect(obj.result).toBe("Success");
      expect(+obj.x).toBe(12);
      done();
    });
  });
});
