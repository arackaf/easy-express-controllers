function postAndCheck(uri, data, done, check, options){
    runAndCheck(uri, data, 'post', done, check);
}

function getAndCheck(uri, data, done, check, options){
    runAndCheck(uri, data, 'get', done, check);
}

function putAndCheck(uri, data, done, check, options){
    runAndCheck(uri, data, 'put', done, check);
}

function deleteAndCheck(uri, data, done, check, options){
    runAndCheck(uri, data, 'delete', done, check);
}

function runAndCheck(url, data, verb, done, check, options = { }){
    $.ajax({
        url,
        method: verb,
        data,
        success: function success(obj) {
            check(obj);
            done();
        },
        error: function(jqXHR, errorType, error){
            throw `This error occurred ${errorType} ${error}
                StatusText: ${jqXHR.statusText}
                StatusCode: ${jqXHR.statusCode()}
            `
        }
    });
}

function verbsAreRejected(uri, done, verbs){
    Promise.all(verbs.map(runVerb)).then(() => done());

    function runVerb(verb){
        return new Promise(res => {
            $.ajax({
                url: uri,
                method: verb,
                data: { },
                success: function(){
                    throw `${uri} didn't fail for ${verb} but should have`
                },
                error: function(error){
                    assert.equal(error.status, 404, `${uri} failed with ${verb} for something other than a 404`);
                    res();
                }
            });
        }).catch(() => null)
    }
}

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

window.utils = {
    postAndCheck,
    getAndCheck,
    putAndCheck,
    deleteAndCheck,
    runAndCheck,
    verbsAreRejected,
    checkRoutesAndVerbs
};

assert.deepEqual = deepEqual;

function deepEqual(obj1, obj2){
    let keys1 = Object.keys(obj1),
        keys2 = Object.keys(obj2);

    assert.equal(keys1.length, keys2.length);

    keys1.forEach(k => {
        if (typeof obj1[k] === 'object'){
            deepEqual(obj1[k], obj2[k]);
        } else {
            assert.equal(obj1[k], obj2[k]);
        }
    });

};