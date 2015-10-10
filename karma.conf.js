module.exports = function(config) {
  config.set({
    // frameworks to use - available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["mocha", "chai"],
    port: 3001,
    browsers: ["Chrome"]
  });
};
