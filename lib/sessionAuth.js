'use strict';

/**
 * Middleware ches authenticated user.
 * 
 * Check session_id and do not have it redirect to userLogin page
 */

const namedRoutes = require('./namedRoutes');
const Usuario = require('../models/user');

module.exports = function() {
    return function(req, res, next) {
        if (!req.session.authUser) { // not log in
            res.redirect(namedRoutes.login);
            return;
        }

        // get user from db
        Usuario.findById(req.session.authUser._id).then( usuario => {
            req.user = usuario;
            next();
        });    
    };
};