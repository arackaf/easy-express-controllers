describe('Controller routing tests', function(){

    beforeEach(function(){
        expressController.createController(app, 'person');
    });

    it('routes default get paths', function(done){
        utils.getAndCheck('http://localhost:3000/person/details', { }, done, obj => assert.equal('Adam', obj.name));
    });

    it('rejects default get paths wiht other verbs', function(done){
        utils.verbsAreRejected('http://localhost:3000/person/details', done, ['post', 'put', 'delete']);
    });

    it('routes overriden POST paths', function(done){
        utils.postAndCheck('http://localhost:3000/person/save', {}, done, obj => assert.isTrue(true, obj.saved));
    });
 
    it('rejects overriden POST paths with other verbs', function(done){
        utils.verbsAreRejected('http://localhost:3000/person/save', done, ['get', 'put', 'delete']);
    });
});