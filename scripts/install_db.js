'use strict';

require('dotenv').config();

const readline = require('readline');

const products = require('../data/products.json');
const users = require('../data/users.json').users;
const conn = require('../lib/connectMongo');
const Product = require('../models/product');
const User = require('../models/user');

conn.once('open', async () => {
  try {
    const response = await askUser('Estas seguro que quieres borrar los contenidos de la base de datos? (no)');

    if (response.toLowerCase() !== 'yes') {
      console.log('Proceso abortado');
      process.exit();
    }

    await initProducts(products);
    await initUsers(users);
	
	process.exit();

  } catch (err) {
    console.log('Hubo un error', err);
    process.exit(1);
  }
});

function askUser(question) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question,
      function(answer) {
        rl.close();
        resolve(answer);
      }
    );
  });
}

async function initProducts(products) {
  // eliminar los productos actuales
  const deleted = await Product.deleteMany();
  console.log(`Eliminados ${deleted.n} productos.`);

  // cargar los nuevos productos
  const inserted = await Product.insertMany(products);
  console.log(`Insertados ${inserted.length} productos.`);
}

async function initUsers(users) {
  // eliminar los usuarios actuales
  const deleted = await User.deleteMany();
  console.log(`Eliminados ${deleted.n} usuarios.`);
  
  for (let i = 0; i < users.length; i++) {
    users[i].password = await User.hashPassword(users[i].password);
  }

  // cargar los nuevos usuarios
  const inserted = await User.insertMany(users);
  console.log(`Insertados ${inserted.length} usuarios.`);
}