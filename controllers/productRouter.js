'use strict';

const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product');
const { setQueryProducts } = require('../lib/utils');
const sessionAuth = require('../lib/sessionAuth');

function ResponseData (items, tags) {
    this.items = items;
    this.tags = tags;
}

// Todas las llamadas a este router requieren autenticación
router.use(sessionAuth());

/* GET all items will be showed. */
router.get('/private', async (req, res, next) => { 
    let queryProduct = setQueryProducts(req);
    try {    
        const result = await ProductModel.findProducts(queryProduct, req.query.skip, req.query.limit, req.query.sort);
        res.render('products', new ResponseData (result, null));
    } catch (err) {
        next(err);
    }
});

/* GET all diferent tags will be showed. With async/await*/
router.get('/tags', async (req, res, next) => {
    try {    
        const result = await ProductModel.findTags();
        res.render('products', new ResponseData (null, result));
    } catch (err) {
        next(err);
    }
});

module.exports = router;