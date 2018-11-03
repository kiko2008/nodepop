'use strct';

// Controller for web app endpoints

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const namedRoutes = require('../lib/namedRoutes');

class LoginController {

    // GET "/"
    index(req, res, next) {
        res.locals.email = process.env.NODE_ENV === 'development' ? 'admin@example.com' : '';
        res.locals.error = '';
        res.render('login');
    }

    async post(req, res, next) {
        try {
  
            // get body parameters from request
            const email = req.body.email;
            const password = req.body.password;
      
            // Search user
            const usuario = await User.findOne({ email: email });

            if (!usuario || !await bcrypt.compare( password, usuario.password)) {
                res.locals.email = email;
                res.locals.error = 'invalid_credentials';
                res.render('login');
                return;
            }

            // save usr id in session 
            req.session.authUser = { _id: usuario._id };

            // user found and password ok
            res.redirect(namedRoutes.private);

        } catch(err) {
            next(err);
        }
    }

    async postJWT(req, res, next) {
        try {
      
            // get body parameters from request
            const email = req.body.email;
            const password = req.body.password;
      
            //search user
            const usuario = await User.findOne({ email: email });

            if (!usuario || !await bcrypt.compare( password, usuario.password)) {
                res.json({ success: false, error: 'Invalid credentials'});
                return;
            }

            // User found and password ok, create token
            jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
                expiresIn: '2d'
            }, (err, token) => {
                if (err) {
                    next(err);
                    return;
                }
                res.json({ success: true, token: token });
            });

        } catch(err) {
            next(err);
        }
    }


    // GET /logout
    logout(req, res, next) {
        delete req.session.authUser; // delete auth from session
        req.session.regenerate(function(err) {
            if (err) {
                next(err);
                return;
            } 
            res.redirect(namedRoutes.home);
        });
    }
}

module.exports = new LoginController();