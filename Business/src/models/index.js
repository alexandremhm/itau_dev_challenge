const { connection } = require('../database/connection')

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});