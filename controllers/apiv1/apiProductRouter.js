'use strict';

const express = require('express');
const router = express.Router();
const ProductModel = require('../../models/product');
const { setQueryProducts } = require('../../lib/utils');
const jwtAuth = require('../../lib/jwtAuth');
const upload = require('../../lib/uploadConfig');
const cote = require('cote');
const namedRoutes = require('../../lib/namedRoutes');

// protect all middleware with JWT Auth
router.use(jwtAuth());

/* GET all items will be showed. */
router.get(namedRoutes.products, async (req, res) => {	
    let queryProduct = setQueryProducts(req);
    try {    
        const responseResult = await ProductModel.findProducts(queryProduct, req.query.skip, req.query.limit, req.query.sort);		
        res.json({ success: true, result: responseResult });
    } catch (err) {
        res.json({ success: false, err: err });
    }
});

/* GET all diferent tags will be showed. With async/await*/
router.get(namedRoutes.tags, async (req, res) => {
    try {
        const responseResult = await ProductModel.findTags();
        res.json({ success: true, result: responseResult });
    } catch (err) {
        res.json({ success: false, err: err });
    }
});

/* POST create new product */
router.post(namedRoutes.newProduct,  upload.single('image') , async (req, res) => {
    var productData = {
        name: req.body.name,
        sale: req.body.sale,
        price: req.body.price,	
        photo: req.file.originalname,
        tags: [req.body.tags]
    };

    const responseResult = await ProductModel.saveProduct(productData);

    // Call microservice for create thumbnail
    createThumbnailRequester.send({
        type: 'createThumbnail',
        file: req.file
    }, res => {
        console.log(`Create thumbnail --> ${res}`, Date.now());
    });

    res.json(responseResult);
});
const createThumbnailRequester = new cote.Requester({ name: 'create image thumbnail' });

module.exports = router;