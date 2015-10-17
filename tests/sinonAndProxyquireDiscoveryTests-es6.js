var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('sinon discovery tests', function(){

    it('should report the correct call count', function(){
        var spy = sinon.spy(f);

        spy();
        spy();
        spy();

        assert.equal(spy.callCount, 3);
    });

    it('should report the correct call count when spied a second time on same function', function(){
        var spy = sinon.spy(f);

        spy();
        spy();
        spy();

        assert.equal(spy.callCount, 3);
    });

    it('should correctly verify calls to createController', function(){
        var spy = sinon.spy(f);

        var overrides = {};

        spy(app, 'a');
        spy(app, 'c', overrides);
        spy(app, 'b');

        verifyCreateControllerSpyCalls(spy, [['a'], ['b'], ['c', overrides]]);
    });

    function verifyCreateControllerSpyCalls(spy, calls){
        assert.equal(spy.callCount, calls.length);
        let callsToVerify = calls.map((c, i) => spy.getCall(i));

        assert.isFalse(callsToVerify.some(c => c.args[0] !== app));

        //I don't pass the app value in for all calls to verify, so the args are shifted
        callsToVerify.forEach(spyCall => assert.equal(calls.filter(callToVerify =>
            callToVerify[0] === spyCall.args[1] && callToVerify[1] === spyCall.args[2]).length, 1)
        );
    }

    function f(){
    }



});