'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on('error', err => {
    console.error(new Error ('connection error:' + err));
    process.exit(1);
});

conn.once('open', () => {
    console.log('Connect to bbdd: ', conn.name);
});

console.log(process.env.MONGO_CONNECTION);

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true });

module.exports = conn;