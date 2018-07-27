'use strict';

// connect to a bbdd
require('dotenv').config();
const file = require('fs');
const conn = require('../lib/connectMongo');
const ProductModel = require('../models/Product');

(async() => {
	try {    
		await conn.dropDatabase();
	} catch (err) {   
		return "Error in drop db";
	}

	file.readFile('./scripts/products.json', 'UTF-8' ,(err, data) => {
		if (err) {
			throw err;
		}		
		const arrayProducts = JSON.parse(data);
		ProductModel.insertMany(arrayProducts, (error) => {
			if(error) {
				return new Error('Error in inserts in bbdd');
			}
			console.info('BBDD initialize succesfully');
			conn.close();
		});
	});
})().catch(err => console.error(err));