const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable, controller } = require('../../expressController');

@controller({ path: 'publisher' })
class publisherDetails {
    constructor(){ }
    details(){
        this.send({ received: true });
    }
    @httpPost
    @route('/global-path-publisher/:userId')
    foo(USERID, X, Y){
        this.send({ userId: USERID, x: X, y: Y });
    }
}

module.exports = publisherDetails;