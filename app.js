'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// Middleware logs
app.use(logger('dev'));
// Middleware parser json
app.use(express.json());
// Middleware parser url
app.use(express.urlencoded({ extended: false }));
// Middleware parser cookies
app.use(cookieParser());
// Middleware static
app.use(express.static(path.join(__dirname, 'public')));
// Connect to bbdd
require('./lib/connectMongo');
require('./models/product');
// For api ads
app.use('/apiv1', require('./controllers/apiv1/apiProductRouter'));
// For web ads
app.use('/', require('./controllers/productRouter'));

// app title
app.locals.titulo='Nodepop';

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res) {
	res.status(err.status || 500);

	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.render('error');
});

module.exports = app;