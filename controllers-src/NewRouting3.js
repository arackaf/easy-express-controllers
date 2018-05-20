const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable } = require("../index");

class NewRouting3 {
  @httpPost
  @route("")
  get() {
    this.send({ postReceived: true });
  }

  @httpGet
  @route("")
  post() {
    this.send({ getReceived: true });
  }

  @httpPut
  @route("")
  delete() {
    this.send({ putReceived: true });
  }

  @httpDelete
  @route("")
  put() {
    this.send({ deleteReceived: true });
  }
}

module.exports = NewRouting3;
