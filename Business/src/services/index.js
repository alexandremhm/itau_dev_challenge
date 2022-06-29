const {getMovieByTitle} = require('../api/movie-search-api')
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
const { MovieReviewModel } = require("../models");
const Base64  = require('crypto-js/enc-base64');


class MovieReviewService {
  constructor () {
    this.SECRET = process.env.SECRET;
    this.movieReviewModel = new MovieReviewModel();
  }
  getMovieByTitle = async (movie) => {
    return await getMovieByTitle(movie);
  }

  userRegister = async (payload) => {
    const { name, email, password } = payload;

    const encryptedPassord = CryptoJS.AES.encrypt(password, this.SECRET).toString()

    const response = {
      name,
      email,
      password: encryptedPassord
    }

    await this.movieReviewModel.userRegister(response);
  }  

  getMovieInfosByTitle = async (movie) => {
    const response = await this.movieReviewModel.getMovieInfosByTitle(movie);  
    
    return response;
  }

  scoreMovieByTitle = async (movie, note, userId) => {
    const response = await this.movieReviewModel.scoreMovieByTitle(movie, note, userId);

    return response;    
  }

  commentMovie = async (userId, movie, comment) => {
    const response = await this.movieReviewModel.commentMovie(userId, movie, comment);

    return response;
  }

  replyComment = async (userId, movieCommentId, commentReply) => {
    const response = await this.movieReviewModel.replyComment(userId, movieCommentId, commentReply);

    return response;
  }

  quoteComment = async (userId, commentId, comment) => {
    const response = await this.movieReviewModel.quoteComment(userId, commentId, comment);

    return response;
  }

  likeComment = async (userId, commentId) => {
    await this.movieReviewModel.likeComment(userId, commentId);
  }

  commentIsRepeated = async (userId, commentId) => {
    const response = await this.movieReviewModel.commentIsRepeated(userId, commentId);

    return response;
  }

  commentDelete = async (userId, commentId) => {
    const response = await this.movieReviewModel.commentDelete(userId, commentId);

    return response;
  }

  promoteUserToModerator = async (userId, userToPromoteId) => {
    const response = await this.movieReviewModel.promoteUserToModerator(userId, userToPromoteId);

    return response;
  }
}

module.exports = {MovieReviewService}
