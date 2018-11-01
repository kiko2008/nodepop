var express = require('express');
var router = express.Router();
//const upload = require('../lib/uploadConfig');
const namedRoutes = require('../lib/namedRoutes');
//const jimp = require('jimp');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// Upload de fichero
/*router.post('/upload', upload.single('imagen') ,(req, res, next) => { 
  console.log('upload:', req.file);

  jimp.read('./public/images/' + req.file.filename)
  .then(image => {
    console.log(image);
    return image
      .resize(210, 160) // resize
      .write('./public/images/' + req.file.filename); // save
  }).catch(err => {
    console.error(err);
  });
  res.redirect(namedRoutes.home);
});
 */



module.exports = router;
