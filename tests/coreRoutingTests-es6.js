describe('Controller routing tests', function(){

    before(function(){
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

    it('routes custom paths', function(done){
        utils.getAndCheck('http://localhost:3000/person/x/y/z', { }, done, obj => assert.isTrue(obj.madeIt));
    });

    it('rejects default paths for overridden routes', function(done){
        utils.verbsAreRejected('http://localhost:3000/person/customPathBasic', done, ['get', 'post', 'put', 'delete']);
    });

    it('routes custom paths with parameters passed', function(done){
        utils.getAndCheck('http://localhost:3000/person/x/12/z/13', { }, done, obj => assert.deepEqual(obj, { userId: '12', parentId: '13' }));
    });

    it('posts to custom paths', function(done){
        utils.postAndCheck('http://localhost:3000/person/z/x', { }, done, obj => assert.isTrue(obj.received));
    });

    it('posts to custom paths with attributes', function(done){
        utils.postAndCheck('http://localhost:3000/person/z/6/x/5', { }, done, obj => assert.deepEqual(obj, { a: '6', b: '5' }));
    });

    it('posts to custom paths with attributes and body params', function(done){
        utils.postAndCheck('http://localhost:3000/person/z/6/x/5', { c: 4 }, done, obj => assert.deepEqual(obj, { a: '6', b: '5', c: 4 }));
    });

    it('posts to custom paths with attributes in other order', function(done){
        utils.postAndCheck('http://localhost:3000/person/z/xx', { }, done, obj => assert.isTrue(obj.received));
    });

    it('rejects default paths for non-routeable action', function(done){
        utils.verbsAreRejected('http://localhost:3000/person/dontTouchMe', done, ['get', 'post', 'put', 'delete']);
    });

    checkRoutesAndVerbs('http://localhost:3000/person/getOrPostToMe', ['get', 'post']);
    checkRoutesAndVerbs('http://localhost:3000/person/getOrPostToMe2', ['get', 'post']);
    checkRoutesAndVerbs('http://localhost:3000/person/putOrDeleteToMe', ['put', 'delete']);
    checkRoutesAndVerbs('http://localhost:3000/person/putOrDeleteToMe2', ['put', 'delete']);
    checkRoutesAndVerbs('http://localhost:3000/person/postPutOrDeleteToMe', ['post', 'put', 'delete']);
    checkRoutesAndVerbs('http://localhost:3000/person/postPutOrDeleteToMe2', ['post', 'put', 'delete']);
    checkRoutesAndVerbs('http://localhost:3000/person/postPutOrDeleteToMe3', ['post', 'put', 'delete']);
    checkRoutesAndVerbs('http://localhost:3000/person/postPutOrDeleteToMeReversedDecorators', ['post', 'put', 'delete']);

    checkRoutesAndVerbs('http://localhost:3000/person/putToMe', ['put']);
    checkRoutesAndVerbs('http://localhost:3000/person/putToMe2', ['put']);
    checkRoutesAndVerbs('http://localhost:3000/person/deleteToMe', ['delete']);

    function checkRoutesAndVerbs(uri, verbs){
        verbs.forEach(verb => {
            it(`routes ${verb} to ${uri.replace('http://localhost:3000', '')}`, function(done){
                utils[`${verb}AndCheck`](uri, {}, done, obj => assert.isTrue(obj.received));
            });
        });
        let badVerbs = ['get', 'post', 'put', 'delete'].filter(verb => verbs.indexOf(verb) === -1);
        it(`rejects ${uri} with [${badVerbs}]`, function(done) {
            utils.verbsAreRejected(uri, done, badVerbs);
        });
    }

});