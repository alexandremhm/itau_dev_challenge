const { connection } = require('../database/connection')

connection.connect(function(err) {
  if (err) throw err;
  
  console.log("Connected!");

  // create Table permissions

  let sql = "CREATE TABLE IF NOT EXISTS permissions (id INT AUTO_INCREMENT PRIMARY KEY, role_permission VARCHAR(255) DEFAULT 'Leitor')";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table permissions created");
  });

  sql = "INSERT into permissions (role_permission) VALUES ('LEITOR'), ('BÁSICO'), ('AVANÇADO'), ('MODERADOR')";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table permissions created");
  });

  // create Table users

  sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), points INT, email VARCHAR(500), password VARCHAR(500), permission_id INT, FOREIGN KEY (permission_id) REFERENCES permissions (id) ON UPDATE CASCADE ON DELETE CASCADE)";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table users created");
  });

  // create Table movie_statistic

  sql = "CREATE TABLE IF NOT EXISTS movie_statistic (id INT AUTO_INCREMENT PRIMARY KEY, comment VARCHAR(500), note INT, movie_name VARCHAR(500), user_id int, CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE)";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table comments created");
  }); 

  connection.end();
});
