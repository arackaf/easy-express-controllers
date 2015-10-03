# easy-express-controllers

Adds traditional MVC style controller support to Express with ES6 class, and ES-next decorators.

For example

```javascript
const { httpPost, route, nonRoutable } = require('expressController');

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
    @route('billing/:userId/:billingId')
    getUserBillingInfo(userId, billingId){
        this.send({ userId, parentId });
    }
    @nonRoutable
    dontTouchMe(){
        //do some private work the other controller actions might all use
    }
}
```

# Docs #

## Class methods and routes ##

Each method found on your class's prototype through `Object.getOwnPropertyNames` will become a route for the path `/{your controller path}/{method name}`.  So from the example above `/person/details`, `/person/save`, etc route appropriately.

Methods default to GET.  To override this, you can add one or more decorators of `@httpPost`, `@httpGet`, `@httpPut` and `@httpDelete`, or add multiple verbs at one time through `@acceptVerbs`, which accepts an array, for example `@acceptVerbs(['put', 'delete'])`.

## Handling Routes ##

Inside the controller method the following methods from the response object will be directly available through `this`: `send`, `sendFile`, `json`, `jsonp`.  The original request and response objects are also available through `this.request` and `this.response` respectively.

Method parameters are parsed from the request and set for you.  Matching values are added if found on `request.params`, `request.query`, and `request.body` in that order of precedence: a matching value from `request.params` will be passed over a matching value from `request.body`. This will not work with ES6 default parameter values yet, but Node doesn't even support that at the moment.

**NOTE**: to ensure parameter parsing works make sure you have your middleware setup appropriately:

```javascript
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
```

## Overriding route paths ##

If you want to override the path for a class method, just use the `@route` decorator.  In the code above, `person/billing/:userId/:billingId` will route to the `getUserBillingInfo` method and pass in those parameter values.

If you have a class method that you want to never be routed to, you can either define it with a symbol, so `Object.getOwnPropertyNames` misses it, or just add the @nonRoutable decorator.

## Future features ##

- automatic controller generation by walking existing files.
- configurable root for all controllers, instead of hard coding to `/controllers`.
- allow custom routes to dump the `/{controller}` route



