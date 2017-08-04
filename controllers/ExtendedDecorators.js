'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var _require = require('../index'),
    httpGet = _require.httpGet,
    httpPut = _require.httpPut,
    httpDelete = _require.httpDelete,
    httpPost = _require.httpPost,
    httpPatch = _require.httpPatch,
    acceptVerbs = _require.acceptVerbs,
    route = _require.route,
    nonRoutable = _require.nonRoutable;

var ExtendedDecorators = (_dec = httpGet('get-test'), _dec2 = httpPost('post-test'), _dec3 = httpDelete('delete-test'), _dec4 = httpPut('put-test'), _dec5 = httpPatch('patch-test'), _dec6 = httpPost(''), (_class = function () {
    function ExtendedDecorators() {
        _classCallCheck(this, ExtendedDecorators);
    }

    _createClass(ExtendedDecorators, [{
        key: 'get',
        value: function get() {
            this.send({ getReceived: true });
        }
    }, {
        key: 'post',
        value: function post() {
            this.send({ postReceived: true });
        }
    }, {
        key: 'delete',
        value: function _delete() {
            this.send({ deleteReceived: true });
        }
    }, {
        key: 'put',
        value: function put() {
            this.send({ putReceived: true });
        }
    }, {
        key: 'patch',
        value: function patch() {
            this.send({ patchReceived: true });
        }
    }, {
        key: 'realPost',
        value: function realPost() {
            this.send({ postReceived: true });
        }
    }]);

    return ExtendedDecorators;
}(), (_applyDecoratedDescriptor(_class.prototype, 'get', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'get'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'post', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'post'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'delete', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'delete'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'put', [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, 'put'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'patch', [_dec5], Object.getOwnPropertyDescriptor(_class.prototype, 'patch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'realPost', [_dec6], Object.getOwnPropertyDescriptor(_class.prototype, 'realPost'), _class.prototype)), _class));


module.exports = ExtendedDecorators;