'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const { isAPI } = require('./lib/utils');
const namedRoutes = require('./lib/namedRoutes');
const loginController = require('./controllers/loginController');

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

// Configuramos multiidioma en express
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

// app title
app.locals.titulo='Nodepop';

// Connect to bbdd
require('./lib/connectMongo');
require('./models/product');

// For api ads
app.post('/apiv1/loginJWT', loginController.postJWT);
app.use('/apiv1', require('./controllers/apiv1/apiProductRouter'));

// initialize / load the session of the user who makes the request
app.use(session({
    name: 'nodepop-session',
    secret: 'hsd fkljadskjfhadssldjkh adksfhsd897sd8yf87w3yrih7wdehiuwehrfiu',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true }, // two days validity
    store: new MongoStore({
        // How to connect to db
        url: process.env.MONGO_CONNECTION
    })
}));

// auth helper middleware - for access to session from views
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

/**
 * Application web routes
 */
app.use(namedRoutes.home,    require('./controllers/index'));
app.use(namedRoutes.lang,    require('./controllers/lang'));
app.get(namedRoutes.private, require('./controllers/productRouter'));
app.get(namedRoutes.login,   loginController.index);
app.post(namedRoutes.login,  loginController.post);
app.get(namedRoutes.logout,  loginController.logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // error de validación
    if (err.name === "TokenExpiredError" || err.message==="no token provided") {
        err.status = 401;           
    }
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