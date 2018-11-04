'use strict';

const multer = require('multer');
const path = require('path');
const namedRoutes = require('../lib/namedRoutes');

// Multer upload config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, namedRoutes.images));
    }, 
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

module.exports = multer({ storage: storage });