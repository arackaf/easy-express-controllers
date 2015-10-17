var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('creare all controllers tests', function(){

    it('should create a single controller', function(){
        var spy = sinon.spy(f);
        var createAllControllers = proxyquire('../util/createAllControllers', { './createController' : spy });
        var overrides = { controllerPath: './createAllControllersTest1' };

        createAllControllers(app, null, overrides);

        verifyCreateControllerSpyCalls(spy, [['class1', overrides]]);
    });

    it('should skip ES6 files configured', function(){
        var spy = sinon.spy(f);
        var createAllControllers = proxyquire('../util/createAllControllers', { './createController' : spy });
        var overrides = { controllerPath: './createAllControllersTest2' };

        createAllControllers(app, { fileTest: f => !/-es6\.js$/i.test(f) }, overrides);

        verifyCreateControllerSpyCalls(spy, [['class1', overrides]]);
    });

    it('should skip ES6 files by default with file extension', function(){
        var spy = sinon.spy(f);
        var createAllControllers = proxyquire('../util/createAllControllers', { './createController' : spy });
        var overrides = { controllerPath: './createAllControllersTest3' };

        createAllControllers(app, null, overrides);

        verifyCreateControllerSpyCalls(spy, [['class1', overrides]]);
    });

    function verifyCreateControllerSpyCalls(spy, calls){
        assert.equal(spy.callCount, calls.length, 'total call count wrong');
        let callsToVerify = calls.map((c, i) => spy.getCall(i));

        assert.isFalse(callsToVerify.some(c => c.args[0] !== app), 'app not passed correctly');

        //I don't pass the app value in for all calls to verify, so the args are shifted
        callsToVerify.forEach(spyCall => assert.equal(calls.filter(callToVerify =>
            callToVerify[0] === spyCall.args[1] && callToVerify[1] === spyCall.args[2]).length, 1, 'Call missing for ' + spyCall.args[1])
        );
    }

    function f(){
    }



});