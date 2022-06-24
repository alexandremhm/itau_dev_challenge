const { connection } = require('../database/connection')
class MovieReviewModel {  
  constructor () {
    this.connection = connection;
  }

  userRegister = async (payload) => {    
    const { name, password, email } = payload;

    const sql = `INSERT INTO users (name, email, password, permission_id) VALUES ('${name}', '${email}', '${password}', '1')`

    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("User created!");
    });
  }
}

module.exports = {MovieReviewModel};

