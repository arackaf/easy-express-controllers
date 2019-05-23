var createController = require("./createController");
var fs = require("fs");
var path = require("path");

function descendAndCall(app, basePath, config, overrides, subDirectory = "") {
  let adjustedBasePath = basePath + (subDirectory ? `/${subDirectory}` : "");
  let files = fs.readdirSync(adjustedBasePath);
  config = Object.assign({ fileTest: () => true }, config);

  files.forEach(f => {
    if (fs.statSync(`${adjustedBasePath}/${f}`).isDirectory()) {
      if (f != ".esm-cache") {
        //hard code to protect for JDalton's ESM loader
        descendAndCall(app, basePath, config, overrides, subDirectory + `${f}/`);
      }
    } else {
      if (!/.js$/i.test(f)) return;
      if (!config.fileTest(f)) return;
      createController(app, subDirectory + f.replace(".js", ""), overrides);
    }
  });
}

/**
 * Moves through folder tree and registers every controller found
 * @param {express} app Express app instance
 * @param {Object} config Optional config object
 * @param {string} config.controllerPath configures controllers directory - defaults to "controllers"
 * @param {string} config.__dirname path from which controllerPath is located - defaults to path.dirname('.')
 * @param {function} config.fileTest configures file test - defauts to () => true
 * @param {Object} _overrides no longer needed, but being kept indefinitely for backward compatibility with prior versions
 */
function createAllControllers(app, config, _overrides) {
  config = config || {};
  _overrides = _overrides || {};
  //support the old overrides arg
  let overrides = {
    controllerPath: _overrides.controllerPath || config.controllerPath,
    __dirname: _overrides.__dirname || config.__dirname
  };
  if (!overrides.controllerPath) delete overrides.controllerPath;
  if (!overrides.__dirname) delete overrides.__dirname;

  let classBasePath = path.resolve(overrides.__dirname || path.dirname("."), overrides.controllerPath || "controllers").replace(/\\/g, "/");

  descendAndCall(app, classBasePath, config, overrides);
}

module.exports = createAllControllers;
