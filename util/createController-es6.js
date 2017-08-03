var path = require('path');

const supportedVerbs = ['get', 'post', 'put', 'delete', 'patch'];

function createController(app, controllerPath, overrides = { }){

    let router = require('express').Router(),
        classBasePath = path.relative(__dirname, path.resolve(overrides.__dirname || path.dirname('.'), overrides.controllerPath || "controllers")).replace(/\\/g, '/'),
        classDec = require(`${classBasePath}/${controllerPath}`);

    if (typeof classDec === 'object' && typeof classDec.default === 'function'){
        classDec = classDec.default;
    }

    let routeOverrides = classDec.routeOverrides || {},
        controllerSettings = classDec.controllerSettings || {};

    Object.getOwnPropertyNames(classDec.prototype).forEach(method => {
        if (method === 'constructor' || typeof classDec.prototype[method] !== 'function') return;

        let methodOverrides = routeOverrides[method] || { },
            defaultVerb = controllerSettings.defaultVerb ? [controllerSettings.defaultVerb] : null;

        if (methodOverrides.nonRoutable) return;

        const conventionalVerb = supportedVerbs.includes(method) ? [method] : null;

        let verbsToUse = methodOverrides.httpMethod || conventionalVerb || defaultVerb ||  ['get'],
            actionPath = methodOverrides.route;
            
        if (actionPath == null) actionPath = verbsToUse.includes(method) ? '' : method;

        if (actionPath[0] == '/'){
            //global path - add right to express
            verbsToUse.forEach(verb => app[verb](actionPath, createRouteCallback(classDec, method)));
        } else {
            //normal path - add to the router
            verbsToUse.forEach(verb => router[verb](`/${actionPath}`, createRouteCallback(classDec, method)));
        }
    });

    app.use(`/${controllerSettings.path || controllerPath}`, router);
}

function createRouteCallback(classDec, method){
    return function(req, res){
        let { allRequestValues, body, query, params } = getRequestValues(req);

        let obj = new classDec();
        obj.request = req;
        obj.response = res;
        ['send', 'sendFile', 'json', 'jsonp'].forEach(m => obj[m] = res[m].bind(res));
        obj[method](allRequestValues);
    };
}

function getRequestValues(req){
    let body = typeof req.body === 'object' ? req.body : {},
        query = typeof req.query === 'object' ? req.query : {},
        params = typeof req.params === 'object' ? req.params : {};

    return { allRequestValues: Object.assign({}, body, query, params), body, query, params };
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