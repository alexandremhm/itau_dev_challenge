const { connection } = require('./connection')

connection.connect(function(err) {
  if (err) throw err;
  
  console.log("Connected!");

  // create Table permissions

  let sql = "CREATE TABLE IF NOT EXISTS permissions (id INT AUTO_INCREMENT PRIMARY KEY, role_permission VARCHAR(255) DEFAULT 'Leitor')";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

  // create Table users

  sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), points INT, permission_id INT, FOREIGN KEY (permission_id) REFERENCES permissions (id) ON UPDATE CASCADE ON DELETE CASCADE)";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

  // create Table comments

  sql = "CREATE TABLE IF NOT EXISTS comments (id INT AUTO_INCREMENT PRIMARY KEY, comment VARCHAR(500))";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

   // create Table user_comments

   sql = "CREATE TABLE IF NOT EXISTS user_ncomments (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, comment_id INT, FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE, FOREIGN KEY (comment_id) REFERENCES comments (id) ON UPDATE CASCADE ON DELETE CASCADE)";

   connection.query(sql, function (err, result) {
     if (err) throw err;
     console.log("Table created");
   });

  // create Table notes

  sql = "CREATE TABLE IF NOT EXISTS notes (id INT AUTO_INCREMENT PRIMARY KEY, note INT)";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

  // create Table user_notes

  sql = "CREATE TABLE IF NOT EXISTS user_notes (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, note_id INT, FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE, FOREIGN KEY (note_id) REFERENCES notes (id) ON UPDATE CASCADE ON DELETE CASCADE)";

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
