var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _desc, _value, _class;

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

const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable } = require("../index");

let Person = (_dec = route("x/y/z"), _dec2 = route("x/:userId/z/:parentId"), _dec3 = route("x2/:userId/z2/:parentId"), _dec4 = route("z/x"), _dec5 = route("z/xx"), _dec6 = route("z/:a/x/:b"), _dec7 = acceptVerbs(["put", "delete"]), _dec8 = acceptVerbs(["put", "delete"]), _dec9 = acceptVerbs(["post", "put", "delete"]), _dec10 = acceptVerbs(["put", "delete"]), _dec11 = acceptVerbs("put"), _dec12 = acceptVerbs(["get", "post"]), (_class = class Person {
  details() {
    this.send({ name: "Adam" });
  }

  save() {
    this.send({ saved: true });
  }
  getStuffA({ a, b, c }) {
    this.send({ a, b, c });
  }

  setStuffA({ x, y, z }) {
    this.send({ x, y, z });
  }

  customPathBasic() {
    this.send({ madeIt: true });
  }

  customPathWithParameters({ userId, parentId }) {
    this.send({ userId, parentId });
  }

  customPathWithParameters2({ userId, parentId }) {
    this.send({ userId, parentId });
  }

  customPathWithPost() {
    this.send({ received: true });
  }

  customPathWithPost2() {
    this.send({ received: true });
  }

  customPathWithPost3({ a, b, c }) {
    this.send({ a, b, c });
  }

  dontTouchMe() {
    this.send({});
  }

  putOrDeleteToMe() {
    this.send({ received: true });
  }

  putOrDeleteToMe2() {
    this.send({ received: true });
  }

  postPutOrDeleteToMe() {
    this.send({ received: true });
  }

  postPutOrDeleteToMe2() {
    this.send({ received: true });
  }

  postPutOrDeleteToMe3() {
    this.send({ received: true });
  }

  postPutOrDeleteToMeReversedDecorators() {
    this.send({ received: true });
  }

  putToMe() {
    this.send({ received: true });
  }

  putToMe2() {
    this.send({ received: true });
  }

  deleteToMe() {
    this.response.send({ received: true });
  }

  getOrPostToMe() {
    this.send({ received: true });
  }

  getOrPostToMe2() {
    this.send({ received: true });
  }
}, (_applyDecoratedDescriptor(_class.prototype, "save", [httpPost], Object.getOwnPropertyDescriptor(_class.prototype, "save"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setStuffA", [httpPost], Object.getOwnPropertyDescriptor(_class.prototype, "setStuffA"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "customPathBasic", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "customPathBasic"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "customPathWithParameters", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "customPathWithParameters"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "customPathWithParameters2", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "customPathWithParameters2"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "customPathWithPost", [_dec4, httpPost], Object.getOwnPropertyDescriptor(_class.prototype, "customPathWithPost"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "customPathWithPost2", [httpPost, _dec5], Object.getOwnPropertyDescriptor(_class.prototype, "customPathWithPost2"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "customPathWithPost3", [httpPost, _dec6], Object.getOwnPropertyDescriptor(_class.prototype, "customPathWithPost3"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "dontTouchMe", [nonRoutable], Object.getOwnPropertyDescriptor(_class.prototype, "dontTouchMe"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "putOrDeleteToMe", [_dec7], Object.getOwnPropertyDescriptor(_class.prototype, "putOrDeleteToMe"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "putOrDeleteToMe2", [httpPut, httpDelete], Object.getOwnPropertyDescriptor(_class.prototype, "putOrDeleteToMe2"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "postPutOrDeleteToMe", [_dec8, httpPost], Object.getOwnPropertyDescriptor(_class.prototype, "postPutOrDeleteToMe"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "postPutOrDeleteToMe2", [_dec9], Object.getOwnPropertyDescriptor(_class.prototype, "postPutOrDeleteToMe2"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "postPutOrDeleteToMe3", [httpPut, httpDelete, httpPost], Object.getOwnPropertyDescriptor(_class.prototype, "postPutOrDeleteToMe3"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "postPutOrDeleteToMeReversedDecorators", [httpPost, _dec10], Object.getOwnPropertyDescriptor(_class.prototype, "postPutOrDeleteToMeReversedDecorators"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "putToMe", [httpPut], Object.getOwnPropertyDescriptor(_class.prototype, "putToMe"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "putToMe2", [_dec11], Object.getOwnPropertyDescriptor(_class.prototype, "putToMe2"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "deleteToMe", [httpDelete], Object.getOwnPropertyDescriptor(_class.prototype, "deleteToMe"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getOrPostToMe", [httpGet, httpPost], Object.getOwnPropertyDescriptor(_class.prototype, "getOrPostToMe"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getOrPostToMe2", [_dec12], Object.getOwnPropertyDescriptor(_class.prototype, "getOrPostToMe2"), _class.prototype)), _class));


module.exports = Person;