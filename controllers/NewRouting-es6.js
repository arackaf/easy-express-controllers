const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable } = require('../index');

class NewRouting {
    get(){
        this.send({getReceived: true});
    }

    @httpPost
    post(){
        this.send({postReceived: true});
    }

    @httpPut
    @route('')
    xyz(){
        this.send({putReceived: true});
    }

    foo(){
        this.send({fooReceived: true});
    }
}

module.exports = NewRouting;