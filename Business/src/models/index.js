const { connection } = require('../database/connection')
require('dotenv').config();

const CryptoJS = require("crypto-js");

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
  
  getMovieInfosByTitle = async (movie) => {
    const sql = `SELECT * FROM movie_statistic WHERE movie_name = '${movie}'`;
    const results = await connection.promise().query(sql)
    const response = JSON.parse(JSON.stringify(results[0]))

    if (response.length === 0) {
      return 'Movie not found';
    }
    return response;
  } 

  getUserByName = async (userId) => {
    const sql = `SELECT * FROM users WHERE id = '${userId}'`;
    const results = await connection.promise().query(sql)
    const response = JSON.parse(JSON.stringify(results[0]))

    if (response.length === 0) {
      return 'Movie not found';
    }
    return response;
  }

  updateUserNote = async (userId, points) => {
    let sql = `UPDATE users SET points = '${Number(points)}' WHERE id = '${userId}'`;
    await connection.promise().query(sql)
  }
  
  scoreMovieByTitle = async (movie, note, userId) => {

    console.log(movie, note, userId)

    let sql = `INSERT movie_statistic (note, movie_name, user_id) VALUES ('${Number(note)}', '${movie}', '${userId}')`;

    const results = await connection.promise().query(sql)

    const {insertId} = JSON.parse(JSON.stringify(results[0]))

    if (!insertId) {
      return 'Movie not found';
    }

    const user = await this.getUserByName(userId);

    const newNote = Number(user[0].points) + 1;

    await this.updateUserNote(userId, newNote);
  }
}

module.exports = {MovieReviewModel};

