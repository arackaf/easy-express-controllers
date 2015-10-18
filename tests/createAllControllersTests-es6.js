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

    it('should work with 2 levels', function(){
        var spy = sinon.spy(f);
        var createAllControllers = proxyquire('../util/createAllControllers', { './createController' : spy });
        var overrides = { controllerPath: './createAllControllersTest4' };

        createAllControllers(app, null, overrides);

        let calls = [
            ['class1', overrides],
            ['level2/classa', overrides],
            ['level2/classb', overrides]
        ];
        utils.verifyCreateControllerSpyCalls(spy, calls);
    });

    it('should work with 3 levels', function(){
        var spy = sinon.spy(f);
        var createAllControllers = proxyquire('../util/createAllControllers', { './createController' : spy });
        var overrides = { controllerPath: './createAllControllersTest5' };

        createAllControllers(app, null, overrides);

        let calls = [
            ['class1', overrides],
            ['level2/classa', overrides],
            ['level2/classb', overrides],
            ['level2/level3/classi', overrides],
            ['level2/level3/classii', overrides],
            ['level2/level3/classiii', overrides]
        ];
        utils.verifyCreateControllerSpyCalls(spy, calls);
    });

    it('should work with 3 levels and properly exclude es6 files', function(){
        var spy = sinon.spy(f);
        var createAllControllers = proxyquire('../util/createAllControllers', { './createController' : spy });
        var overrides = { controllerPath: './createAllControllersTest6' };

        createAllControllers(app, { fileTest: f => !/-es6\.js$/i.test(f) }, overrides);

        let calls = [
            ['class1', overrides],
            ['level2/classa', overrides],
            ['level2/classb', overrides],
            ['level2/level3/classi', overrides],
            ['level2/level3/classii', overrides],
            ['level2/level3/classiii', overrides]
        ];
        utils.verifyCreateControllerSpyCalls(spy, calls);
    });


    function f(){
    }



});