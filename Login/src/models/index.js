const { connection } = require('../database/connection')
require('dotenv').config();

const CryptoJS = require("crypto-js");

class MovieReviewModel {
  constructor () {
    this.connection = connection;
  }

  userLogin = async ({email, password}) => {
    const sql = `SELECT * FROM users WHERE email = '${email}'`
    const results = await connection.promise().query(sql)
    const response = JSON.parse(JSON.stringify(results[0]))

    if (response.length === 0) {
      return 'User not found';
    } 
    const encryptedPassord = (response[0].password);

    const {SECRET} = process.env;

    const decryptedPassword = Object(CryptoJS.AES.decrypt(encryptedPassord, SECRET));

    const decryptedPasswordString = decryptedPassword.toString(CryptoJS.enc.Utf8);

    if (decryptedPasswordString !== password) {
      return 'Email or password do not exists!'
    } else {
      return;
    }
  }
}

module.exports = {MovieReviewModel};
