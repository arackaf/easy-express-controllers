const { httpGet, httpPut, httpDelete, httpPost, acceptVerbs, route, nonRoutable, controller } = require('../../index');

@controller({defaultVerb: 'post'})
export default class Book {
    details(){
        this.send({ received: true });
    }
    @httpPost
    foo({ x }){
        this.send({ x });
    }
    @httpGet
    foo2({ x }){
        this.send({ x });
    }
}
