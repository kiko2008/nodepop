'use strict';

const jwt = require('jsonwebtoken');

/**
 * Middleware checks JWT token is valid
 */

module.exports = function() {
    return (req, res, next) => {
        // get token from request
        const token = req.body.token || req.query.token || req.get('x-access-token');

        if (!token) {
            const err = new Error('no token provided');
            next(err);
            return;
        }

        // check is valid token
        jwt.verify(token, process.env.JWT_SECRET, (err, descodificado) => {
            if (err) {
                next(err);
                return;
            }
            req.apiUserId = descodificado._id;
            next();
        });
    };
};