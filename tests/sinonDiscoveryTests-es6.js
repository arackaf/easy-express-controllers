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

        utils.verifyCreateControllerSpyCalls(spy, [['a'], ['b'], ['c', overrides]]);
    });

    function f(){
    }



});