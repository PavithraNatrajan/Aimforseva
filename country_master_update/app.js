const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var cons = require('consolidate');
const logger = require('./logger');
const config = require('./model/config');
const index = require('./routes/index');
const getCountryList = require('./routes/master/country_master');//changes by rajesh(t0007) any query asks
const state = require('./routes/master/state_master');
//const user = require('./routes/master/user_master');

var app = express();
 
// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( index);
app.use(getCountryList);//changes by rajesh(t0007) any query asks
app.use(state);

//app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
