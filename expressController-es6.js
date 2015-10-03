var extend = require('extend');
var { getParameterNames } = require('./util/parameterSniffer');

function createController(app, path){
    var router = require('express').Router();

    var classDec = require(`./controllers/${path}`);
    let overrides = classDec.routeOverrides || {};

    Object.getOwnPropertyNames(classDec.prototype).forEach(method => {
        if (method === 'constructor' || typeof classDec.prototype[method] !== 'function') return;

        let methodOverrides = overrides[method] || { },
            verbsToUse = methodOverrides.httpMethod || ['get'],
            parameterNames = getParameterNames(classDec.prototype[method]);

        if (methodOverrides.nonRoutable) return;

        verbsToUse.forEach(verb => {
            router[verb](`/${methodOverrides.route || method}`, function (req, res) {
                let requestValues = getRequestValues(req),
                    parameterValues = parameterNames.map(name => requestValues[name]);

                let obj = new classDec();
                obj.request = req;
                obj.response = res;
                ['send', 'sendFile', 'json', 'jsonp'].forEach(m => obj[m] = res[m].bind(res));
                obj[method](...parameterValues);
            });
        });
    });

    app.use(`/${path}`, router);
}

function getRequestValues(req){
    let body = typeof req.body === 'object' ? req.body : null,
        query = typeof req.query === 'object' ? req.query : null,
        params = typeof req.params === 'object' ? req.params : null;

    return extend({}, body, query, params);
}

function httpGet(target, name, decorator){
    addVerbs('get', target, name, decorator);
}

function httpPost(target, name, decorator){
    addVerbs('post', target, name, decorator);
}

function httpPut(target, name, decorator){
    addVerbs('put', target, name, decorator);
}

function httpDelete(target, name, decorator){
    addVerbs('delete', target, name, decorator);
}

function acceptVerbs(verbs){
    return function(target, name, decorator){
        addVerbs(verbs, target, name, decorator);
    }
}

function addVerbs(verbs, target, name, decorator){
    if (!target.constructor.routeOverrides){
        target.constructor.routeOverrides = {};
    }
    if (!target.constructor.routeOverrides[name]){
        target.constructor.routeOverrides[name] = { };
    }
    if (typeof target.constructor.routeOverrides[name].httpMethod === 'string'){
        target.constructor.routeOverrides[name].httpMethod = [target.constructor.routeOverrides[name].httpMethod];
    } else if (typeof target.constructor.routeOverrides[name].httpMethod === 'undefined'){
        target.constructor.routeOverrides[name].httpMethod = [];
    }
    if (!Array.isArray(verbs)){
        verbs = [verbs];
    }
    target.constructor.routeOverrides[name].httpMethod.push(...verbs);
}

function route(routeName){
    return function (target, name, decorator){
        if (!target.constructor.routeOverrides){
            target.constructor.routeOverrides = {};
        }
        if (!target.constructor.routeOverrides[name]){
            target.constructor.routeOverrides[name] = { };
        }
        target.constructor.routeOverrides[name].route = routeName;
    }
}

function nonRoutable(target, name, decorator){
    if (!target.constructor.routeOverrides){
        target.constructor.routeOverrides = {};
    }
    if (!target.constructor.routeOverrides[name]){
        target.constructor.routeOverrides[name] = { };
    }
    target.constructor.routeOverrides[name].nonRoutable = true;
}

module.exports = {
    createController,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    acceptVerbs,
    route,
    nonRoutable
};