var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

require('dotenv').config();

var express = require('express');
var passport = require('passport');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, './'));
//app.set('view engine', 'hjs');
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({
  defaultLayout: 'single', 
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts');
  partialsDir: path.join(__dirname, 'views/partials');
}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Mongoose ODM
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECT_STRING);

require('./authentication').init(app);


app.use(session({
  store: new RedisStore({
    url: process.env.REDIS_URL
  }),
  secret: process.env.REDIS_SECRET,
  resave: false,
  saveUnitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./user').init(app);
require('./songs').routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
