var extend = require('extend');
var { getParameterNames } = require('./parameterSniffer');
var path = require('path');

function createController(app, controllerPath, overrides = { }){

    let router = require('express').Router(),
        classBasePath = path.relative(__dirname, path.resolve(overrides.__dirname || path.dirname('.'), overrides.controllerPath || "controllers")).replace(/\\/g, '/'),
        classDec = require(`${classBasePath}/${controllerPath}`),
        routeOverrides = classDec.routeOverrides || {},
        controllerSettings = classDec.controllerSettings || {};

    Object.getOwnPropertyNames(classDec.prototype).forEach(method => {
        if (method === 'constructor' || typeof classDec.prototype[method] !== 'function') return;

        let methodOverrides = routeOverrides[method] || { };

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

    app.use(`/${controllerSettings.path || controllerPath}`, router);
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

module.exports = createController;