describe('Controller routing tests', function(){

    beforeEach(function(){
        expressController.createController(app, 'person');
    });

    it('routes default get paths', function(done){
        utils.getAndCheck('http://localhost:3000/person/details', { name: 'Adam Get' }, done, obj => assert.equal(obj.name, 'Adam'));
    });

    it('rejects default get paths wiht other verbs', function(done){
        utils.verbsAreRejected('http://localhost:3000/person/details', done, ['post', 'put', 'delete']);
    });

    it('routes overriden POST verb', function(done){
        utils.postAndCheck('http://localhost:3000/person/save', { name: 'Adam' }, done, obj => assert.isTrue(obj.saved));
    });
 
    it('rejects overriden POST verb with other verbs', function(done){
        utils.verbsAreRejected('http://localhost:3000/person/save', done, ['get', 'put', 'delete']);
    });

    it('sets parameter values for GET', function(done){
        utils.getAndCheck('http://localhost:3000/person/getStuffA', { a: 1, b: 2, c: 3 }, done, obj => assert.deepEqual(obj, { a: 1, b: 2, c: 3 }));
    });

    it('sets parameter values for GET with QueryString', function(done){
        utils.getAndCheck('http://localhost:3000/person/getStuffA?a=1&b=2&c=3', { }, done, obj => assert.deepEqual(obj, { a: '1', b: '2', c: '3' }));
    });

    it('sets parameter values for POST', function(done){
        utils.postAndCheck('http://localhost:3000/person/setStuffA', { x: 1, y: 2, z: 3 }, done, obj => assert.deepEqual(obj, { x: 1, y: 2, z: 3 }));
    });

});