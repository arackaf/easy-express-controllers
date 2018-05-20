const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable } = require("../index");

class GlobalController {
  constructor() {}
  @route("/globalRoute1")
  foo() {
    this.send({ received: true });
  }
  @httpPost
  @acceptVerbs(["put"])
  @route("/globalRoute2")
  lala() {
    this.send({ received: true });
  }
  @httpPost
  @route("/globalRoute3/:userId")
  lolo({ USERID, X, Y }) {
    this.send({ userId: USERID, x: X, y: Y });
  }
}

module.exports = GlobalController;
