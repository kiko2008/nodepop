'use strict';

const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product');
const { setQueryProducts } = require('../lib/utils');
const sessionAuth = require('../lib/sessionAuth');
const namedRoutes = require('../lib/namedRoutes');

function ResponseData (items, tags) {
    this.items=items;
    this.tags=tags;
}

// protect all middleware with session Auth
router.use(sessionAuth());

/* GET all items will be showed. */
router.get(namedRoutes.private, async (req, res, next) => {
    let queryProduct=setQueryProducts(req);
    try {    
        const result=await ProductModel.findProducts(queryProduct, req.query.skip, req.query.limit, req.query.sort);
        res.render('products', new ResponseData(result, null));
    }catch (err){
        next(err);
    }
});

/* GET all diferent tags will be showed. With async/await*/
router.get(namedRoutes.tags, async (req, res, next) => {
    try {    
        const result =await ProductModel.findTags();
        res.render('products', new ResponseData(null, result));
    } catch (err) {
        next(err);
    }
});

module.exports = router;