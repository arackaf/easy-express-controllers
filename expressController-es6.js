var extend = require('extend');
var { getParameterNames } = require('./util/parameterSniffer');

function createController(app, path){
    var router = require('express').Router();

    var classDec = require(`./controllers/${path}`);
    let overrides = classDec.routeOverrides || {};

    Object.getOwnPropertyNames(classDec.prototype).forEach(method => {
        if (method === 'constructor' || typeof classDec.prototype[method] !== 'function') return;

        let methodOverrides = overrides[method] || { },
            verbToUse = methodOverrides.httpMethod || 'get',
            parameterNames = getParameterNames(classDec.prototype[method]);

        router[verbToUse](`/${methodOverrides.route || method}`, function(req, res){
            let requestValues = getRequestValues(req),
                parameterValues = parameterNames.map(name => requestValues[name]);

            let obj = new classDec();
            obj.request = req;
            obj.response = res;
            obj.send = res.send.bind(res);
            obj[method](...parameterValues);
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

function httpPost(target, name, decorator){
    if (!target.constructor.routeOverrides){
        target.constructor.routeOverrides = {};
    }
    if (!target.constructor.routeOverrides[name]){
        target.constructor.routeOverrides[name] = { };
    }
    target.constructor.routeOverrides[name].httpMethod = 'post';
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

module.exports = {
    createController,
    httpPost,
    route
};