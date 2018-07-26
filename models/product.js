'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	name: String,
	sale: Boolean,
	price: Number,
	photo: String,
	tags: [String]
});

const ProductModel = mongoose.model('products', productSchema);
module.exports = ProductModel;
// Functions with operations related to the save and find model. To reuse in api an web middlewares
module.exports.findProducts = function(queryProduct, skip, limit, sort) {
	return ProductModel.find(queryProduct).skip(Number(skip)).limit(Number(limit)).sort(sort).exec();	
}

/*module.exports.findProducts = async function(queryProduct, skip, limit, sort) {

	try {
		const arrayProducts = [];		
		const cursorProducts = ProductModel.find(queryProduct).skip(Number(skip)).limit(Number(limit)).sort(sort).cursor();				
		await cursorProducts.eachAsync(item => {
			// Capitalize name	
			item.name = item.name.charAt(0).toUpperCase() + item.name.slice(1);  
			arrayProducts.push(item);
		});

		return { success: true, result: arrayProducts };
	} catch (err) {		
		throw { success: false, error: err.message };
	}
}*/

module.exports.findTags = function() {
	return ProductModel.find().distinct('tags').exec();	
}

module.exports.saveProduct = async function(req) {
	
	try {
		let newProduct = new ProductModel(req.body);
		newProduct.name = '../../images/' + newProduct.name;
		const data = await newProduct.save();
		console.log('Product created succesfully');
		return { success: true, result: data };	
	} catch (err) {
		return { success: false, error: err.message };
	}
}