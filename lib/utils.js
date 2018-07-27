'use strict';

module.exports.setQueryProducts = function(req) {
	let queryProduct = new Object();

	if(req.query.name !== undefined) {
		queryProduct.name = req.query.name.toLowerCase().trim();
	}	

	if(req.query.sale !== undefined) {
		queryProduct.sale = req.query.sale;
	}

	if(req.query.price !== undefined) {
		let priceQuery = req.query.price;
		if(priceQuery.split('-').length > 1) {	
			if(priceQuery[0] === '-') {
				// case smaller than
				queryProduct.price = {$lte:priceQuery.slice(1, priceQuery.length)};
			} else if(priceQuery[priceQuery.length-1] === '-') {
				// case greather than
				queryProduct.price = {$gte:priceQuery.slice(0, priceQuery.length-1)};
			} else {
				// case between
				queryProduct.price = {$gte:priceQuery.split('-')[0], $lte:priceQuery.split('-')[1]};
			}
		} else {
			// case exact price
			queryProduct.price = req.query.price;
		}
	}

	if(req.query.tags !== undefined) {	
		let tags = req.query.tags.split(',').map(function (item) {
			return item.toLowerCase().trim();
		});	
		tags = (tags.length > 1)?{ $all: tags}:tags;
		queryProduct.tags = tags;
	}	

	return queryProduct;
};