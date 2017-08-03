const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable } = require('../index');

class NewRouting {
    get(){
        this.send({getReceived: true});
    }

    post(){
        this.send({postReceived: true});
    }

    @httpPost
    delete(){
        this.send({deleteReceived: true});
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