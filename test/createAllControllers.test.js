const { start, stop } = require("./testSetup");
jest.mock("../src/createController");

const mockFn = require("../src/createController");

beforeEach(() => {
  mockFn.mockReset();
});
afterAll(() => {});

describe("creare all controllers tests", function() {
  it("should create a single controller", function() {
    var createAllControllers = require("../src/createAllControllers");
    var overrides = { controllerPath: "./dummyControllers/createAllControllersTest1" };

    createAllControllers(-1, null, overrides);
    let spy = require("../src/createController");
    utils.verifyCreateControllerSpyCalls(spy, [["class1", overrides]]);
  });

  it("should skip ES6 files configured", function() {
    var createAllControllers = require("../src/createAllControllers");
    var overrides = { controllerPath: "./dummyControllers/createAllControllersTest2" };

    createAllControllers(-1, { fileTest: f => !/-es6\.js$/i.test(f) }, overrides);
    let spy = require("../src/createController");
    utils.verifyCreateControllerSpyCalls(spy, [["class1", overrides]]);
  });

  it("should skip ES6 files by default with file extension", function() {
    var createAllControllers = require("../src/createAllControllers");
    var overrides = { controllerPath: "./dummyControllers/createAllControllersTest3" };

    createAllControllers(-1, null, overrides);
    let spy = require("../src/createController");
    utils.verifyCreateControllerSpyCalls(spy, [["class1", overrides]]);
  });

  it("should work with 2 levels", function() {
    var createAllControllers = require("../src/createAllControllers");
    var overrides = { controllerPath: "./dummyControllers/createAllControllersTest4" };

    createAllControllers(-1, null, overrides);

    let calls = [["class1", overrides], ["level2/classa", overrides], ["level2/classb", overrides]];
    let spy = require("../src/createController");
    utils.verifyCreateControllerSpyCalls(spy, calls);
  });

  it("should work with 3 levels", function() {
    var createAllControllers = require("../src/createAllControllers");
    var overrides = { controllerPath: "./dummyControllers/createAllControllersTest5" };

    createAllControllers(-1, null, overrides);

    let calls = [
      ["class1", overrides],
      ["level2/classa", overrides],
      ["level2/classb", overrides],
      ["level2/level3/classi", overrides],
      ["level2/level3/classii", overrides],
      ["level2/level3/classiii", overrides]
    ];
    let spy = require("../src/createController");
    utils.verifyCreateControllerSpyCalls(spy, calls);
  });

  it("should work with 3 levels and properly exclude es6 files", function() {
    var createAllControllers = require("../src/createAllControllers");
    var overrides = { controllerPath: "./dummyControllers/createAllControllersTest6" };

    createAllControllers(-1, { fileTest: f => !/-es6\.js$/i.test(f) }, overrides);

    let calls = [
      ["class1", overrides],
      ["level2/classa", overrides],
      ["level2/classb", overrides],
      ["level2/level3/classi", overrides],
      ["level2/level3/classii", overrides],
      ["level2/level3/classiii", overrides]
    ];
    let spy = require("../src/createController");
    utils.verifyCreateControllerSpyCalls(spy, calls);
  });
});
