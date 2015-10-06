const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable } = require('../../index');

class Book {
    constructor(){ }
    details(){
        this.send({ received: true });
    }
    @httpPost
    @route('/global-path-foo/:userId')
    foo(USERID, X, Y){
        this.send({ userId: USERID, x: X, y: Y });
    }
}

module.exports = Book;