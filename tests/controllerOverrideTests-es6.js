describe('Nested routes tests', function() {

    before(function () {
        expressController.createController(app, 'publisher/publisherDetails');
    });

    it('routes default get paths when controller path overridden', function (done) {
        utils.getAndCheck('http://localhost:3000/publisher/details', {}, done, obj => assert.isTrue(obj.received));
    });

    it('rejects default controller path', function (done) {
        utils.verbsAreRejected('http://localhost:3000/publisher/publisherDetails/details', done, ['get', 'post', 'put', 'delete']);
    });

    it('handles parameters correctly on an overridden global path', function(done){
        utils.postAndCheck('http://localhost:3000/global-path-publisher/15?x=1', { y: 2 }, done, obj => assert.deepEqual(obj, { x: '1', y: 2, userId: '15' }));
    });

    it('rejects opted-in verbs on original paths that was overridden ', function(done){
        utils.verbsAreRejected('http://localhost:3000/global-path-publisher/12', done, ['get', 'put', 'delete']);
    });
});