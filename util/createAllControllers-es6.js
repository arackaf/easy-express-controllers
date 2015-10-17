var createController = require('./createController');

function createAllControllers(){
    createController(app, 'a/b/c');
}

module.exports = createAllControllers;