'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	name: String,
	sale: Boolean,
	price: Number,
	photo: String,
	tags: [String]
});

// Functions with operations related to the save and find model. To reuse in api an web middlewares
productSchema.statics.findProducts = function(queryProduct, skip, limit, sort) {
	return ProductModel.find(queryProduct).skip(Number(skip)).limit(Number(limit)).sort(sort).exec();	
};

productSchema.statics.findTags = function() {
	return ProductModel.find().distinct('tags').exec();	
};

productSchema.statics.saveProduct = async function(req) {
	
	try {
		let newProduct = new ProductModel(req.body);
		// add path for image
		newProduct.photo = '../../images/' + newProduct.photo;
		const data = await newProduct.save();
		console.log('Product created succesfully');
		return { success: true, result: data };	
	} catch (err) {
		return { success: false, error: err.message };
	}
};

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;