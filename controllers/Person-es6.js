const { httpPost } = require('../expressController');

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
}

module.exports = Person;