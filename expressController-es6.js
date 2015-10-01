function createController(app, path){
    var router = require('express').Router();

    var classDec = require(`./controllers/${path}`);
    let overrides = classDec.routeOverrides || {};

    Object.getOwnPropertyNames(classDec.prototype).forEach(method => {
        if (method === 'constructor' || typeof classDec.prototype[method] !== 'function') return;

        router[(overrides[method] && overrides[method].httpMethod) || 'get'](`/${method}`, function(req, res){
            let obj = new classDec();
            obj.request = req;
            obj.response = res;
            obj.send = res.send.bind(res);
            obj[method]();
        });
    });

    app.use(`/${path}`, router);
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