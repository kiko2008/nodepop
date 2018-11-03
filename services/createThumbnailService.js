'use strict';

// Service for create thumbnails with jimp
const cote = require('cote');
const jimp = require('jimp');

const responder = new cote.Responder({ name: 'create image thumbnail responder' });

// petition (req): { file: file }
responder.on('createThumbnail', (req, done) => {
    // resize image with jimp
    jimp.read(req.file.path)
        .then(image => {
            console.log(image);
            return image
                .resize(100, 100) // resize
                .write('../public/images/thumbnails/' + req.file.filename); // save
        }).catch(err => {
            console.error(err);
        });
  
    done({result: 'Thumbnail create successfully.'});
});