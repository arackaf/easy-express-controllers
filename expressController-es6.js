var extend = require('extend');
var { getParameterNames } = require('./util/parameterSniffer');

function createController(app, path){
    var router = require('express').Router();

    var classDec = require(`./controllers/${path}`);
    let overrides = classDec.routeOverrides || {};

    Object.getOwnPropertyNames(classDec.prototype).forEach(method => {
        if (method === 'constructor' || typeof classDec.prototype[method] !== 'function') return;

        let verbToUse = (overrides[method] && overrides[method].httpMethod) || 'get',
            parameterNames = getParameterNames(classDec.prototype[method]);

        router[verbToUse](`/${method}`, function(req, res){
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
        query = typeof req.query === 'object' ? req.query : null;

    return extend({}, body, query);
}

function httpPost(target, name, decorator){
    if (!target.constructor.routeOverrides){
        target.constructor.routeOverrides = {};
    }
    target.constructor.routeOverrides[name] = {
        httpMethod: 'post'
    };
}

module.exports = {
    createController,
    httpPost
};