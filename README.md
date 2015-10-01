# express-controllers
Adding MVC style controller support to Express with ES6 class, and ES-next decorators.

We have class via ES6, and we have annotations via the ES.next decorator proposal.  This project seeks to leverage both to emulate traditional MVC frameworks in traditional languages.

For example

```javascript
class Person{
    details(){
        this.send({ name: 'Adam' });
    }
    @httpPost
    save(){
        this.send({ saved: true });
    }
    @httpPost
    setStuff(x, y, z){
        //These parameter values will be parsed and set for you.  No need to parse request.body or request.query - just use them
        this.send({ x, y, z });
    }
}
```

Methods default to GET paths based on name, which is overridable with a decorator.  So a `GET` to `/person/details` or a `POST` to `/person/save` above both route appropriately.

Inside the method relevant response objects have been added to the object itself (for now just `send`), and the original request and response objects are also available.

Method parameters are parsed from the request body and set for you.  Will not work with ES6 default parameter values yet, but Node doesn't even support that at the moment.

Future features will include:

- automatic controller generation by walking existing files (obviously).
- configurable root for all controllers, instead of hard coding to /controllers.
- more decorators to support things like custom action paths, marking a method as non-routable, etc.