'use strict';

const multer = require('multer');
const path = require('path');

// Multer upload config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public/images'));
    }, 
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

module.exports = multer({ storage: storage });