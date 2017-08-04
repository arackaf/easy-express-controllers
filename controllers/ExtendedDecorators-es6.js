const { httpGet, httpPut, httpDelete, httpPost, httpPatch, acceptVerbs, route, nonRoutable } = require('../index');

class ExtendedDecorators {
    @httpGet('get-test')
    get(){
        this.send({getReceived: true});
    }

    @httpPost('post-test')
    post(){
        this.send({postReceived: true});
    }

    @httpDelete('delete-test')
    delete(){
        this.send({deleteReceived: true});
    }

    @httpPut('put-test')
    put(){
        this.send({putReceived: true});
    }

    @httpPatch('patch-test')
    patch(){
        this.send({patchReceived: true});
    }

    @httpPost('')
    realPost(){
        this.send({postReceived: true});
    }
}

module.exports = ExtendedDecorators;