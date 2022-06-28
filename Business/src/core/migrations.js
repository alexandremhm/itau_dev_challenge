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

  sql = "CREATE TABLE IF NOT EXISTS movie_statistic (id INT AUTO_INCREMENT PRIMARY KEY, note INT, movie_name VARCHAR(500), user_id int, CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE)";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table movie_statistic created");
  }); 

  // create Table movie_comments

  sql = "CREATE TABLE IF NOT EXISTS movie_comments (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, movie_name VARCHAR(500), comment VARCHAR(500), CONSTRAINT fk_users_id FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE)";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table movie_comments created");
  }); 

  // create Table movie_comment_reply

  sql = "CREATE TABLE IF NOT EXISTS movie_comment_reply (id INT AUTO_INCREMENT PRIMARY KEY, movie_comment_id INT, comment_reply VARCHAR(500), user_id int, CONSTRAINT fk_movie_comment_id FOREIGN KEY (movie_comment_id) REFERENCES movie_comments(id) ON UPDATE CASCADE ON DELETE CASCADE)";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table movie_comment_reply created");
  });

  // create Table like_movie_comment

  sql = "CREATE TABLE IF NOT EXISTS like_movie_comment (id INT AUTO_INCREMENT PRIMARY KEY, movie_comment_id INT, user_id int, like_comment INT DEFAULT 0, CONSTRAINT fk_movies_comment_id FOREIGN KEY (movie_comment_id) REFERENCES movie_comments(id) ON UPDATE CASCADE ON DELETE CASCADE)";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table movie_comment_reply created");
  }); 

  connection.end();
});
