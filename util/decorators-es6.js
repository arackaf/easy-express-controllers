function controller({ path, defaultVerb = 'get' } = {}){
    return function (target, name, decorator){
        target.controllerSettings = { path, defaultVerb };
    }
}

function httpGet(routeName) {
    return _applyUniversalHttpDecorator('get', routeName, arguments);
}

function httpPost(routeName) {
    return _applyUniversalHttpDecorator('post', routeName, arguments);
}

function httpPut(routeName) {
    return _applyUniversalHttpDecorator('put', routeName, arguments);
}

function httpDelete(routeName) {
    return _applyUniversalHttpDecorator('delete', routeName, arguments);
}

function httpPatch(routeName) {
    return _applyUniversalHttpDecorator('patch', routeName, arguments);
}

function acceptVerbs(verbs){
    return function(target, name, decorator){
        addVerbs(verbs, target, name, decorator);
    }
}

function addVerbs(verbs, target, name, decorator){
    const overrides = _getOrCreateOverrides(target, name); 
    if (typeof overrides.httpMethod === 'string'){
        overrides.httpMethod = [overrides.httpMethod];
    } else if (typeof overrides.httpMethod === 'undefined'){
        overrides.httpMethod = [];
    }
    if (!Array.isArray(verbs)){
        verbs = [verbs];
    }
    overrides.httpMethod.push(...verbs);
}

function route(routeName){
    return function (target, name, decorator){
        const overrides = _getOrCreateOverrides(target, name); 
        overrides.route = routeName;
    }
}

function nonRoutable(target, name, decorator){
    const overrides = _getOrCreateOverrides(target, name);   
    overrides.nonRoutable = true;
}

function _applyUniversalHttpDecorator(verb, routeName, args){
    if(args.length == 1){      
        return function (target, name, decorator) {
            addVerbs(verb, target, name, decorator);
            route(routeName)(target, name, decorator);
        };
    }

    addVerbs(verb, ...args);
}

function _getOrCreateOverrides(target, name){
    if (!target.constructor.routeOverrides){
        target.constructor.routeOverrides = {};
    }
    if (!target.constructor.routeOverrides[name]){
        target.constructor.routeOverrides[name] = { };
    }

    return target.constructor.routeOverrides[name];
}


module.exports = {
    controller,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    httpPatch,
    acceptVerbs,
    route,
    nonRoutable
};