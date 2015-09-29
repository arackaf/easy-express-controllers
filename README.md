# express-controllers
Adding MVC style controller support with ES6 class and ES-next decorators to Express.

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
}
```

Methods default to GET paths based on name, which is overridable with a decorator.  So a `GET` to `/person/details` or a `POST` to `/person/save` above both route appropriately.

Inside the method relevant response objects have been added to the object itself (for now just `send`), and the original request and response objects are also available.

Of course this is just a proof of concept at the moment, but eventually there would be decorators to mark a method as non routable, override a path name, etc.

If this isn't an awful idea, future features would likely include:

- automatic controller generation by walking existing files (obviously).
- configurable root for all controllers, instead of hard coding to /controllers.
- support for method parameters, so `save(name, gender)` would be passed the name and gender values from the posted data.
- middleware support for custom controller creation, which is usually used for DI.
- and of course more robust transpilation so generated ES5 files won't be checked in.