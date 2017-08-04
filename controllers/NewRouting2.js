'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('../index'),
    httpGet = _require.httpGet,
    httpPut = _require.httpPut,
    httpDelete = _require.httpDelete,
    httpPost = _require.httpPost,
    acceptVerbs = _require.acceptVerbs,
    route = _require.route,
    nonRoutable = _require.nonRoutable;

var NewRouting2 = function () {
    function NewRouting2() {
        _classCallCheck(this, NewRouting2);
    }

    _createClass(NewRouting2, [{
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
    }]);

    return NewRouting2;
}();

module.exports = NewRouting2;