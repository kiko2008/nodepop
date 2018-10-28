'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const { isAPI } = require('./lib/utils');
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
app.post('/loginJWT', loginController.postJWT);
app.use('/apiv1', require('./controllers/apiv1/apiProductRouter'));

/**
 * Inicializamos/cargamos la sesión del usuario que hace la petición
 */
app.use(session({
    name: 'nodepop-session',
    secret: 'hsd fkljadskjfhadssldjkh adksfhsd897sd8yf87w3yrih7wdehiuwehrfiu',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true }, // a los dos días de inactividad caduca
    store: new MongoStore({
      // como conectarse a la base de datos
      url: process.env.MONGO_CONNECTION
    })
}));

// auth helper middleware - dar acceso a sesión desde las vistas
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

/**
 * Application web routes
 */
app.use('/',        require('./controllers/index'));
app.use('/lang',    require('./controllers/lang'));
app.get('/private', require('./controllers/productRouter'));
// usamos el estilo de Controladores para estructurar las rutas
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);

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
