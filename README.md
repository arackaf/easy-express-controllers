# easy-express-controllers

Adds traditional MVC style controller support to Express with ES6 class, and ES-next decorators.

For example

```javascript
const { httpPost, route, nonRoutable } = require('easy-express-controllers');

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
        //These parameter values will be parsed and set for you.
        //No need to parse request.body or request.query - just use them
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

## Turning an ES6 class into express paths ##

```javascript
var easyControllers = require('easy-express-controllers').easyControllers;
easyControllers.createController(app, 'person');
```
The code above will require `person.js` from under a root-level `controllers` directory.

This code gets to the root controllers directory in part with `path.dirname('.')` which is equivalent to `process.cwd()`.  This can easily be wrong depending on which directory your app was launched **from**.  If you can't, or don't want to rely on this being correct, you can pass in a third argument of an object literal.  If the object has a `__dirname` property, then that will be used in place of `path.dirname('.')`.  The object literal can *also* have a `controllerPath` property which overrides the default value of just `'controllers'`; it should be the **relative** path from the root of your application to your controllers directory, or a **relative** path from the overridden `__dirname` value you passed in, described above, to your controllers directory.

For example, if for whatever reason you're running `createController` from a module one level beneath the root, and pointing to a root level directory called `controllers2` then this code will work

```javascript
easyControllers.createController(app, 'books/foo', { __dirname: __dirname, controllerPath: '../controllers2' });
```

Or of course this would also work under the same circumstances, assuming `process.cwd` could be used.

```javascript
easyControllers.createController(app, 'books/foo', { controllerPath: 'controllers2' });
```

Soon there will also be a mechanism to have this utility walk an entire directory and create all controllers for you.

## Class methods and routes ##

Each method found on your class's prototype through `Object.getOwnPropertyNames` will become a route for the path `/{your controller path}/{method name}`.  So from the example above `/person/details`, `/person/save`, etc route appropriately, assuming the Person class is found directly under your `controllers` directory.  If you have a class method that you want to never be routed to, you can either define it with a symbol, so `Object.getOwnPropertyNames` misses it, or just add the `@nonRoutable` decorator.

These routes are added through Express 4's router, and the call to `app.use` is passed the controller class's path.  So if your controller was located at `books/Book.js`, and had a method `details`, then the path would be `books/book/details`.  The base path of the contorller can be overridden with the `@controller` decorator, which accepts an object literal; the `path` property therein overrides this value.  For example, if this controller was located under the `controllers` directory at `publisher/publisherDetails.js`

```javascript
@controller({ path: 'publisher' })
class publisherDetails {
    details(){
        this.send({ received: true });
    }
}
```

then the path to the details method would be `/publisher/details`, as opposed to `publisher/publisherDetails/details` if this decorator were absent.

## Overriding route paths ##

If you want to override the path for a class method, just use the `@route` decorator.  In the first demo code above, `person/billing/:userId/:billingId` will route to the `getUserBillingInfo` method and pass in those parameter values (as explained further below).

If you'd like to set the complete path for a controller action, overriding even the base controller path, just use the `@route` decorator, and use a leading slash.  For example

```javascript
@httpPost
@route('/some-global-path/:userId')
about(userId){
}
```

the path `/some-global-path/:userId` will trigger the method above, regardless of what controller it sits in, or the path thereto.

## Path verbs

Methods default to GET.  To override this, you can add one or more decorators of `@httpPost`, `@httpGet`, `@httpPut` and `@httpDelete`, or add multiple verbs at one time through `@acceptVerbs`, which accepts an array, for example `@acceptVerbs(['put', 'delete'])`.

## Handling Routes ##

Inside the controller method the following methods from the response object will be directly available through `this`: `send`, `sendFile`, `json`, `jsonp`.  The original request and response objects are also available through `this.request` and `this.response` respectively.

Method parameters are parsed from the request and set for you.  Matching values are added if found on `request.params`, `request.query`, and `request.body` in that order of precedence: a matching value from `request.params` will be passed over a matching value from `request.body`. This will not work with ES6 default parameter values yet, but Node doesn't even support them at the moment.  The search for a matching parameter name is case insensitive.

**NOTE**: to ensure parameter parsing works make sure you have your middleware setup appropriately:

```javascript
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
```

**NOTE 2**: The parameter parsing works by analyzing the stringified method in question.  Obviously this is not minification safe.  A future version might provide for a way allowing the parameters to be sniffed prior to minification, and saved to an external file for subsequent dynamic loading.  In the interim ensure that your controllers are not minified, at least if you plan to use parameter sniffing.

## Future features ##

- automatic controller generation by walking existing files.


