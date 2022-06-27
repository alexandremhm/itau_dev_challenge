const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.PASSWORD,
});

module.exports = { connection };
