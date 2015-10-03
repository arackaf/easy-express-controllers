describe('Advanced routing tests', function() {

    before(function () {
        expressController.createController(app, 'globalcontroller');
    });

    it('routes default get paths', function (done) {
        utils.getAndCheck('http://localhost:3000/globalRoute1', { }, done, obj => assert.isTrue(obj.received));
    });

    it('rejects default get paths that was overridden', function(done){
        utils.verbsAreRejected('http://localhost:3000/globalcontroller/foo', done, ['get']);
    });

    utils.checkRoutesAndVerbs('http://localhost:3000/globalRoute2', ['post', 'put']);

    it('rejects default get paths that was overridden 2', function(done){
        utils.verbsAreRejected('http://localhost:3000/globalcontroller/foo', done, ['get']);
    });

    it('rejects opted-in verbs on original paths that was overridden', function(done){
        utils.verbsAreRejected('http://localhost:3000/globalcontroller/lala', done, ['get', 'post', 'put', 'delete']);
    });

    it('rejects opted-in verbs on original paths that was overridden 2', function(done){
        utils.verbsAreRejected('http://localhost:3000/globalcontroller/lolo', done, ['get', 'post', 'put', 'delete']);
    });

    it('handles parameters correctly on an overridden global path', function(done){
        utils.postAndCheck('http://localhost:3000/globalRoute3/15?x=1', { y: 2 }, done, obj => assert.deepEqual(obj, { x: '1', y: 2, userId: '15' }));
    });

    it('rejects opted-in verbs on original paths that was overridden ', function(done){
        utils.verbsAreRejected('http://localhost:3000/globalRoute3/12', done, ['get', 'put', 'delete']);
    });

});