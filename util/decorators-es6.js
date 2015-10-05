function controller({ path }){
    return function (target, name, decorator){
        target.controllerSettings = { path };
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
    controller,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    acceptVerbs,
    route,
    nonRoutable
};