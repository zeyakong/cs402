var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1);// trust first proxy
app.use(session({
        secret: 'PHP is the best language in the world, others are trash! PHP是最牛逼的语言.PHP - самый мощный язык.PHPは最も強力な言語です.',
        cookie: {
            // 10 minus
            maxAge: 600000
        }
    })
);

app.use('/', indexRouter);

module.exports = app;
