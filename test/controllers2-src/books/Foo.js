const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable } = require("../../index");

class Book {
  constructor() {}
  details() {
    this.send({ received: true });
  }
  @httpPost
  @route("/global-path-foo/:userId")
  foo({ userId, x, y }) {
    this.send({ userId, x, y });
  }
}

module.exports = Book;
