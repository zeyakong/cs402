var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var session = require('express-session');
var history = require('connect-history-api-fallback');
var indexRouter = require('./routes/index');

var app = express();
app.use(history({
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors());
app.use(session({
        secret: 'I LIKE angular very much.',
        cookie: {
            // 10 minus
            maxAge: 600000
        }
    })
);

app.use('/api/v1', indexRouter);

module.exports = app;
