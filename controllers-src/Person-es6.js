const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable } = require("../index");

class Person {
  details() {
    this.send({ name: "Adam" });
  }
  @httpPost
  save() {
    this.send({ saved: true });
  }
  getStuffA({ a, b, c }) {
    this.send({ a, b, c });
  }
  @httpPost
  setStuffA({ x, y, z }) {
    this.send({ x, y, z });
  }
  @route("x/y/z")
  customPathBasic() {
    this.send({ madeIt: true });
  }
  @route("x/:userId/z/:parentId")
  customPathWithParameters({ userId, parentId }) {
    this.send({ userId, parentId });
  }
  @route("x2/:userId/z2/:parentId")
  customPathWithParameters2({ userId, parentId }) {
    this.send({ userId, parentId });
  }
  @route("z/x")
  @httpPost
  customPathWithPost() {
    this.send({ received: true });
  }
  @httpPost
  @route("z/xx")
  customPathWithPost2() {
    this.send({ received: true });
  }
  @httpPost
  @route("z/:a/x/:b")
  customPathWithPost3({ a, b, c }) {
    this.send({ a, b, c });
  }
  @nonRoutable
  dontTouchMe() {
    this.send({});
  }
  @acceptVerbs(["put", "delete"])
  putOrDeleteToMe() {
    this.send({ received: true });
  }
  @httpPut
  @httpDelete
  putOrDeleteToMe2() {
    this.send({ received: true });
  }
  @acceptVerbs(["put", "delete"])
  @httpPost
  postPutOrDeleteToMe() {
    this.send({ received: true });
  }
  @acceptVerbs(["post", "put", "delete"])
  postPutOrDeleteToMe2() {
    this.send({ received: true });
  }
  @httpPut
  @httpDelete
  @httpPost
  postPutOrDeleteToMe3() {
    this.send({ received: true });
  }
  @httpPost
  @acceptVerbs(["put", "delete"])
  postPutOrDeleteToMeReversedDecorators() {
    this.send({ received: true });
  }
  @httpPut
  putToMe() {
    this.send({ received: true });
  }
  @acceptVerbs("put")
  putToMe2() {
    this.send({ received: true });
  }
  @httpDelete
  deleteToMe() {
    this.response.send({ received: true });
  }
  @httpGet
  @httpPost
  getOrPostToMe() {
    this.send({ received: true });
  }
  @acceptVerbs(["get", "post"])
  getOrPostToMe2() {
    this.send({ received: true });
  }
}

module.exports = Person;
