const { httpPost } = require('../expressController');

class Person{
    details(){
        this.send({ name: 'Adam' });
    }
    @httpPost
    save(){
        this.send({ saved: true });
    }
}

module.exports = Person;