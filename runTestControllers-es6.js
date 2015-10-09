var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var { easyControllers } = require('./index');
var path = require('path');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.listen(3001);

easyControllers.createController(app, 'person');

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/runner.htm'));
});