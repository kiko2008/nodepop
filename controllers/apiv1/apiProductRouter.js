'use strict';

const express = require('express');
const router = express.Router();
const ProductModel = require('../../models/product');
const { setQueryProducts } = require('../../lib/utils');

/* GET all items will be showed. */
router.get('/products', async (req, res) => {	
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

/* POST create new product with callbacks */
router.post('/newProduct',  async (req, res) => {
	const responseResult = await ProductModel.saveProduct(req);
	res.json(responseResult);
});

module.exports = router;