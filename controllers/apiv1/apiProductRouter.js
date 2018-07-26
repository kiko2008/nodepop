'use strict';

const express = require('express');
const router = express.Router();
const { findProducts } = require('../../models/product');
const { findTags } = require('../../models/product');
const { saveProduct } = require('../../models/product');
const { setQueryProducts } = require('../../lib/utils');

function ResponseData (items, tags) {
	this.items = items;
	this.tags = tags;
}

/* GET all items will be showed. */
router.get('/products', async (req, res, next) => {	
	let queryProduct = setQueryProducts(req);
	try {    
		const responseResult = await findProducts(queryProduct, req.query.skip, req.query.limit, req.query.sort);		
		res.json({ success: true, result: responseResult });
	} catch (err) {
		res.json({ success: false, err: err });
	}
});

/* GET all diferent tags will be showed. With async/await*/
router.get('/tags', async (req, res, next) => {
	try {
		const responseResult = await findTags();
		res.json({ success: true, result: responseResult });
	} catch (err) {
		res.json({ success: false, err: err });
	}
});

/* POST create new product with callbacks */
router.post('/newProduct',  async (req, res) => {
	const responseResult = await saveProduct(req);
	res.json(responseResult);
});

module.exports = router;