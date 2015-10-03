var extend = require('extend');
var { getParameterNames } = require('./util/parameterSniffer');

function createController(app, path){
    var router = require('express').Router();

    var classDec = require(`./controllers/${path}`);
    let overrides = classDec.routeOverrides || {};

    Object.getOwnPropertyNames(classDec.prototype).forEach(method => {
        if (method === 'constructor' || typeof classDec.prototype[method] !== 'function') return;

        let methodOverrides = overrides[method] || { };

        if (methodOverrides.nonRoutable) return;

        let verbsToUse = methodOverrides.httpMethod || ['get'],
            parameterNames = getParameterNames(classDec.prototype[method]),
            actionPath = methodOverrides.route || method;

        if (actionPath[0] == '/'){
            //global path - add right to express
            verbsToUse.forEach(verb => app[verb](actionPath, createRouteCallback(classDec, method, parameterNames)));
        } else {
            //normal path - add to the router
            verbsToUse.forEach(verb => router[verb](`/${actionPath}`, createRouteCallback(classDec, method, parameterNames)));
        }
    });

    app.use(`/${path}`, router);
}

function createRouteCallback(classDec, method, parameterNames){
    return function(req, res){
        let { allRequestValues, body, query, params } = getRequestValues(req),
            parameterValues = parameterNames.map(name => caseInsensitiveLookup(name, body, query, params));

        let obj = new classDec();
        obj.request = req;
        obj.response = res;
        ['send', 'sendFile', 'json', 'jsonp'].forEach(m => obj[m] = res[m].bind(res));
        obj[method](...parameterValues);
    };
}

function getRequestValues(req){
    let body = typeof req.body === 'object' ? req.body : {},
        query = typeof req.query === 'object' ? req.query : {},
        params = typeof req.params === 'object' ? req.params : {};

    return { requestValues: extend({}, body, query, params), body, query, params };
}

function caseInsensitiveLookup(name, body, query, params){
    return getValue(params) || getValue(query) || getValue(body);

    function getValue(checkingObject){
        let keys = Object.keys(checkingObject);
        for (let i = 0; i < keys.length; i++){
            if (name.toLowerCase() == keys[i].toLowerCase()){
                return checkingObject[keys[i]];
            }
        }
    }
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