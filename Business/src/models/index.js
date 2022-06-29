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
  
  getMovieInfosByTitle = async (movie) => {
    const sql = `SELECT * FROM movie_statistic WHERE movie_name = '${movie}'`;
    const results = await connection.promise().query(sql)
    const response = JSON.parse(JSON.stringify(results[0]))

    if (response.length === 0) {
      return 'Movie not found';
    }
    return response;
  } 

  getUserById = async (userId) => {
    const sql = `SELECT * FROM users WHERE id = '${userId}'`;
    const results = await connection.promise().query(sql)
    const response = JSON.parse(JSON.stringify(results[0]))

    if (response.length === 0) {
      return 'Movie not found';
    }
    return response[0];
  }

  updateUserNote = async (userId, points) => {
    let sql = `UPDATE users SET points = '${Number(points)}' WHERE id = '${userId}'`;
    await connection.promise().query(sql)
  } 

  switchUserPermission = (points) => {
    let permission_id = 1

    switch(points) {
      case 20:
        permission_id = 2;
        break;
      case 100:
        permission_id = 3;
        break
      case points >= 1000:
        permission_id = 4;
        break
      default:
        permission_id = 1;
    }

    return permission_id;
  }

  updateUserPermission = async (userId) => {
    const user = await this.getUserById(userId);

    const points = user.points;
    
    const permissionId = this.switchUserPermission(points);

    let sql = `UPDATE users SET permission_id = '${permissionId}' WHERE id = '${userId}'`;
    await connection.promise().query(sql)
  }
  
  scoreMovieByTitle = async (movie, note, userId) => {

    let sql = `INSERT INTO movie_statistic (note, movie_name, user_id) VALUES ('${Number(note)}', '${movie}', '${userId}')`;

    const results = await connection.promise().query(sql)

    const {insertId} = JSON.parse(JSON.stringify(results[0]))

    if (!insertId) {
      return 'Movie not found';
    }

    const user = await this.getUserById(userId);

    const newNote = Number(user.points) + 1;

    await this.updateUserNote(userId, newNote);

    await this.updateUserPermission(userId);
  }

  getCommentByMovieName = async (movie) => {
    const sql = `SELECT * FROM movie_comments WHERE movie_name = '${movie}'`;
    const results = await connection.promise().query(sql);
    const response = JSON.parse(JSON.stringify(results[0]));

    return response[0];
  }

  commentMovie = async (userId, movieName, comment) => {

    const user = await this.getUserById(userId);

    const permissionId = user.permission_id;

    if (permissionId === 1) return 'User is not allowed to comment on a movie!';

    let sql = `INSERT INTO movie_comments (user_id, movie_name, comment) VALUES ('${userId}', '${movieName}', '${comment}')`;

    await connection.promise().query(sql)
  }

  getCommentById = async (commentId) => {
    const sql = `SELECT * FROM movie_comments WHERE id = '${commentId}'`;
    const results = await connection.promise().query(sql);
    const response = JSON.parse(JSON.stringify(results[0]));

    return response[0];
  }

  replyComment = async (userId, movieCommentId, commentReply) => {
    const user = await this.getUserById(userId);
    const permissionId = user.permission_id;

    if (permissionId === '1') return 'User is not allowed to reply a comment!';

    let sql = `INSERT INTO movie_comment_reply (movie_comment_id, comment_reply, user_id) VALUES ('${movieCommentId}', '${commentReply}', '${userId}')`;

    await connection.promise().query(sql)

    const newNote = Number(user.points) + 1;

    await this.updateUserNote(userId, newNote);
  }

  quoteComment = async (userId, commentId, comment) => {
    const user = await this.getUserById(userId);

    const permissionId = user.permission_id;

    if (permissionId < 3) return 'User is not allowed to quote a comment!';

    const commentToQuote = await this.getCommentById(commentId);

    const userFromComment = await this.getUserById(commentToQuote.user_id);

    const newComment = `'${commentToQuote.comment}'(${userFromComment.name}) - ${comment}`;

    return newComment;
  }

  likeComment = async (userId, movieCommentId) => {
    const user = await this.getUserById(userId);

    const permissionId = user.permission_id;

    if (permissionId < 3) return 'User is not allowed to like a comment!';

    let sql = `INSERT INTO like_movie_comment (movie_comment_id, user_id, like_comment) VALUES ('${movieCommentId}', '${userId}', 1)`;

    await connection.promise().query(sql);
  }

  commentIsRepeated = async (userId, commentId) => {
    const user = await this.getUserById(userId);

    const permissionId = user.permission_id;

    if (permissionId < 4) return 'User is not allowed to mark a comment as repeated!';

    let sql = `UPDATE movie_comments set is_repeated = 1 WHERE id = '${commentId}';`;

    await connection.promise().query(sql);
  }

  commentDelete = async (userId, commentId) => {
    const user = await this.getUserById(userId);

    const permissionId = user.permission_id;

    if (permissionId < 4) return 'User is not allowed to delete a comment!';

    let sql = `DELETE FROM movie_comments WHERE id = '${commentId}';`;

    await connection.promise().query(sql);
  }

  promoteUserToModerator = async (userId, userToPromoteId) => {
    const user = await this.getUserById(userId);

    const permissionId = user.permission_id;

    if (permissionId < 4) return 'User is not allowed to mark a comment as repeated!';

    let sql = `UPDATE users set permission_id = 4, points = 1000 WHERE id = '${userToPromoteId}';`;

    await connection.promise().query(sql);
  }
 }

module.exports = {MovieReviewModel};

