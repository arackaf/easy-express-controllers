const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable, controller } = require('../../index');

@controller({ path: 'publisher' })
class publisherDetails {
    constructor(){ }
    details(){
        this.send({ received: true });
    }
    @httpPost
    @route('/global-path-publisher/:userId')
    foo({ userId, x, y }){
        this.send({ userId, x, y });
    }
}

module.exports = publisherDetails;