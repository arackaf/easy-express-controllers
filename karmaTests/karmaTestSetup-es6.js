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

window.utils = {
    postAndCheck,
    getAndCheck,
    putAndCheck,
    deleteAndCheck,
    runAndCheck,
    //verbsAreRejected,
    //checkRoutesAndVerbs
};