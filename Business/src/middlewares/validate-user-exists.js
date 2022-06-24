const { connection } = require('../database/connection')

const validateUserExists = async (req, res, next) => {
  const { name, email } = req.body;
  
  const sql = `SELECT * FROM users WHERE name = ? AND email = ?`

  connection.execute(sql, [name, email], function (err, result) {   
    if (err) console.log(err)
    if (result.length > 0) {
      return res.status(403).json({ message: 'User already registered!' })
    } else {
      next();
    }
  });   
};

module.exports = {validateUserExists};
