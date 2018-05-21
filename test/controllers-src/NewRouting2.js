const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable } = require("../index");

class NewRouting2 {
  get() {
    this.send({ getReceived: true });
  }

  post() {
    this.send({ postReceived: true });
  }

  delete() {
    this.send({ deleteReceived: true });
  }

  put() {
    this.send({ putReceived: true });
  }
}

module.exports = NewRouting2;
