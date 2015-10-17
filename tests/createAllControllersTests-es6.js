var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('creare all controllers tests', function(){

    it('should create a single controller', function(){
        var spy = sinon.spy(f);
        var createAllControllers = proxyquire('../util/createAllControllers', { './createController' : spy });
        var overrides = { controllerPath: './createAllControllersTest1' };

        createAllControllers(app, null, overrides);

        utils.verifyCreateControllerSpyCalls(spy, [['class1', overrides]]);
    });

    it('should skip ES6 files configured', function(){
        var spy = sinon.spy(f);
        var createAllControllers = proxyquire('../util/createAllControllers', { './createController' : spy });
        var overrides = { controllerPath: './createAllControllersTest2' };

        createAllControllers(app, { fileTest: f => !/-es6\.js$/i.test(f) }, overrides);

        utils.verifyCreateControllerSpyCalls(spy, [['class1', overrides]]);
    });

    it('should skip ES6 files by default with file extension', function(){
        var spy = sinon.spy(f);
        var createAllControllers = proxyquire('../util/createAllControllers', { './createController' : spy });
        var overrides = { controllerPath: './createAllControllersTest3' };

        createAllControllers(app, null, overrides);

        utils.verifyCreateControllerSpyCalls(spy, [['class1', overrides]]);
    });

    function f(){
    }



});