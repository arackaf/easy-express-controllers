var createController = require('./createController');
var fs = require('fs');
var path = require('path');

function descendAndCall(app, basePath, config, overrides, subDirectory = '') {
    let adjustedBasePath = basePath + (subDirectory ? `/${subDirectory}` : '');
    let files = fs.readdirSync(adjustedBasePath);
    config = Object.assign({ fileTest: () => true }, config);

    files.forEach(f => {
        if (fs.statSync(`${adjustedBasePath}/${f}`).isDirectory()){
            descendAndCall(app, basePath, config, overrides, subDirectory + `${f}/`);
        } else {
            if (!/.js$/i.test(f)) return;
            if (!config.fileTest(f)) return;
            createController(app, subDirectory + f.replace('.js', ''), overrides);
        }
    });
}

function createAllControllers(app, config, _overrides){
    let overrides = _overrides || {};
    let classBasePath = path.resolve(overrides.__dirname || path.dirname('.'), overrides.controllerPath || 'controllers').replace(/\\/g, '/');

    //createController(app, 'class1', _overrides); //always pass precisely the same object - mainly important for tests :-|
    descendAndCall(app, classBasePath, config, _overrides);
}

module.exports = createAllControllers;