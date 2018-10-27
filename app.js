'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { isAPI } = require('./lib/utils');

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

/**
 * Application web routes
 */
//app.use('/',        require('./routes/index'));
//app.use('/about',   require('./routes/about'));
//app.use('/lang',    require('./routes/lang'));
//app.use('/privado', require('./routes/privado'));
// usamos el estilo de Controladores para estructurar las rutas
//app.get('/login', loginController.index);
//app.post('/login', loginController.post);
//app.get('/logout', loginController.logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
    //next();
});

// error handler
app.use(function(err, req, res, next) {

    res.status(err.status || 500);

    if (isAPI(req)) {
        res.json({ success: false, error: err.message });
        return;
    }

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.render('error');
});

module.exports = app;
