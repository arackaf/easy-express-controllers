'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _desc, _value, _class;

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
    acceptVerbs = _require.acceptVerbs,
    route = _require.route,
    nonRoutable = _require.nonRoutable;

var NewRouting2 = (_dec = route(''), _dec2 = route(''), _dec3 = route(''), _dec4 = route(''), (_class = function () {
    function NewRouting2() {
        _classCallCheck(this, NewRouting2);
    }

    _createClass(NewRouting2, [{
        key: 'get',
        value: function get() {
            this.send({ postReceived: true });
        }
    }, {
        key: 'post',
        value: function post() {
            this.send({ getReceived: true });
        }
    }, {
        key: 'delete',
        value: function _delete() {
            this.send({ putReceived: true });
        }
    }, {
        key: 'put',
        value: function put() {
            this.send({ deleteReceived: true });
        }
    }]);

    return NewRouting2;
}(), (_applyDecoratedDescriptor(_class.prototype, 'get', [httpPost, _dec], Object.getOwnPropertyDescriptor(_class.prototype, 'get'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'post', [httpGet, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'post'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'delete', [httpPut, _dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'delete'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'put', [httpDelete, _dec4], Object.getOwnPropertyDescriptor(_class.prototype, 'put'), _class.prototype)), _class));


module.exports = NewRouting2;