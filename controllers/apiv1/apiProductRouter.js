'use strict';

const express = require('express');
const router = express.Router();
const ProductModel = require('../../models/product');
const { setQueryProducts } = require('../../lib/utils');
const jwtAuth = require('../../lib/jwtAuth');
const upload = require('../../lib/uploadConfig');
//const jimp = require('jimp');
const cote = require('cote');


// Protegemos todo el middleware con JWT Auth
router.use(jwtAuth());

/* GET all items will be showed. */
router.post('/products', async (req, res) => {	
	let queryProduct = setQueryProducts(req);
	try {    
		const responseResult = await ProductModel.findProducts(queryProduct, req.query.skip, req.query.limit, req.query.sort);		
		res.json({ success: true, result: responseResult });
	} catch (err) {
		res.json({ success: false, err: err });
	}
});

/* GET all diferent tags will be showed. With async/await*/
router.get('/tags', async (req, res) => {
	try {
		const responseResult = await ProductModel.findTags();
		res.json({ success: true, result: responseResult });
	} catch (err) {
		res.json({ success: false, err: err });
	}
});

/* POST create new product */
router.post('/newProduct',  upload.single('imagen') , async (req, res) => {
	var productData = {
		name: req.body.name,
		sale: req.body.sale,
		price: req.body.price,
		photo: req.file.originalname,
		tags: [req.body.tags]
	}	
	const responseResult = await ProductModel.saveProduct(productData);

	createThumbnailRequester.send({
		type: 'createThumbnail',
		file: req.file
	  }, res => {
		console.log(`cliente: 100 usd --> ${res} eur`, Date.now());
	  });

	res.json(responseResult);
});


// Upload de fichero
router.post('/upload', upload.single('imagen') ,(req, res, next) => { 
	console.log('upload:', req.file);

	/*jimp.read('./public/images/' + req.file.filename)
	.then(image => {
		console.log(image);
		return image
		.resize(210, 160) // resize
		.write('./public/images/' + req.file.filename); // save
	}).catch(err => {
		console.error(err);
	}); */

createThumbnailRequester.send({
		type: 'createThumbnail', // quienquiera que escuche peticiones de tipo 'convert'
		file: req.file
	  }, res => {
		console.log(`cliente: 100 usd --> ${res} eur`, Date.now());
	  });
	/*createThumbnailRequester.send({type: 'createThumbnail', file: 'req.file'}, function(err, result) {
		console.log(`Create new thumbnail for --> ${result} `, Date.now());
		next();
	// 	res.send(convert);
	});
*/
	res.json({result: 'Thumbnail create succesfully'});
});

/*
var convertRequester = new cote.Requester({
    name: 'currency conversion client',
    namespace: 'convert'
});*/

const createThumbnailRequester = new cote.Requester({ name: 'create image thumbnail' });
/*requester.send({
  type: 'createThumbnail',
  url: 100
}, res => {
  console.log(`cliente: 100 usd --> ${res} eur`, Date.now());
});
*/
module.exports = router;