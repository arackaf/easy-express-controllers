const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable } = require('../../index');

class Book {
    constructor(){ }
    details(){
        this.send({ received: true });
    }
    @httpPost
    @route('/global-path-book/:userId')
    foo({ userId, x, y }){
        this.send({ userId, x, y });
    }
}

export default Book;