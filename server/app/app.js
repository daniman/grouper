var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var utils = require('connect').utils;
var routes = require('./routes/index');
var users = require('./routes/users');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var lessMiddleware = require('less-middleware');

var connection_string = 'localhost/grouper';
mongoose.connect('mongodb://' + connection_string);

var app = express();

app.set('views', path.join(__dirname, '../../client'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(lessMiddleware(path.join(__dirname, '../../client')));
app.use(express.static(path.join(__dirname, '../../client')));

// Make our db accessible to our router
app.use(function(req,res,next){
    next();
});

app.use('/', routes);
app.use('/users', users);

module.exports = app;
