const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: 'trybe',
  database: 'itau-devs',
  password: '123456'
});

module.exports = { connection };
