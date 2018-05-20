const sinon = require("sinon");
const proxyquire = require("proxyquire");

const { start, stop } = require("../testUtil/testSetup");
jest.mock("../util/createController");

const mockFn = require("../util/createController");

beforeEach(() => {
  mockFn.mockReset();
});
afterAll(() => {});

describe("creare all controllers tests", function() {
  it("should create a single controller", function() {
    var createAllControllers = require("../util/createAllControllers");
    var overrides = { controllerPath: "./createAllControllersTest1" };

    createAllControllers(-1, null, overrides);
    let spy = require("../util/createController");
    utils.verifyCreateControllerSpyCalls(spy, [["class1", overrides]]);
  });

  it("should skip ES6 files configured", function() {
    var createAllControllers = require("../util/createAllControllers");
    var overrides = { controllerPath: "./createAllControllersTest2" };

    createAllControllers(-1, { fileTest: f => !/-es6\.js$/i.test(f) }, overrides);
    let spy = require("../util/createController");
    utils.verifyCreateControllerSpyCalls(spy, [["class1", overrides]]);
  });

  it("should skip ES6 files by default with file extension", function() {
    var createAllControllers = require("../util/createAllControllers");
    var overrides = { controllerPath: "./createAllControllersTest3" };

    createAllControllers(-1, null, overrides);
    let spy = require("../util/createController");
    utils.verifyCreateControllerSpyCalls(spy, [["class1", overrides]]);
  });

  it("should work with 2 levels", function() {
    var createAllControllers = require("../util/createAllControllers");
    var overrides = { controllerPath: "./createAllControllersTest4" };

    createAllControllers(-1, null, overrides);

    let calls = [["class1", overrides], ["level2/classa", overrides], ["level2/classb", overrides]];
    let spy = require("../util/createController");
    utils.verifyCreateControllerSpyCalls(spy, calls);
  });

  it("should work with 3 levels", function() {
    var createAllControllers = require("../util/createAllControllers");
    var overrides = { controllerPath: "./createAllControllersTest5" };

    createAllControllers(-1, null, overrides);

    let calls = [
      ["class1", overrides],
      ["level2/classa", overrides],
      ["level2/classb", overrides],
      ["level2/level3/classi", overrides],
      ["level2/level3/classii", overrides],
      ["level2/level3/classiii", overrides]
    ];
    let spy = require("../util/createController");
    utils.verifyCreateControllerSpyCalls(spy, calls);
  });

  it("should work with 3 levels and properly exclude es6 files", function() {
    var createAllControllers = require("../util/createAllControllers");
    var overrides = { controllerPath: "./createAllControllersTest6" };

    createAllControllers(-1, { fileTest: f => !/-es6\.js$/i.test(f) }, overrides);

    let calls = [
      ["class1", overrides],
      ["level2/classa", overrides],
      ["level2/classb", overrides],
      ["level2/level3/classi", overrides],
      ["level2/level3/classii", overrides],
      ["level2/level3/classiii", overrides]
    ];
    let spy = require("../util/createController");
    utils.verifyCreateControllerSpyCalls(spy, calls);
  });
});
