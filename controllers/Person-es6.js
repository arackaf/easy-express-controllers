const { httpPost, route, nonRoutable } = require('../expressController');

class Person{
    details(){
        this.send({ name: 'Adam' });
    }
    @httpPost
    save(){
        this.send({ saved: true });
    }
    getStuffA(a, b, c){
        this.send({ a, b, c });
    }
    @httpPost
    setStuffA(x, y, z){
        this.send({ x, y, z });
    }
    @route('x/y/z')
    customPathBasic(){
        this.send({ madeIt: true });
    }
    @route('x/:userId/z/:parentId')
    customPathWithParameters(userId, parentId){
        this.send({ userId, parentId });
    }
    @route('z/x')
    @httpPost
    customPathWithPost(){
        this.send({ received: true });
    }
    @httpPost
    @route('z/xx')
    customPathWithPost2(){
        this.send({ received: true });
    }
    @httpPost
    @route('z/:a/x/:b')
    customPathWithPost3(a, b, c){
        this.send({ a, b, c });
    }
    @nonRoutable
    dontTouchMe(){
        this.send({});
    }
}

module.exports = Person;