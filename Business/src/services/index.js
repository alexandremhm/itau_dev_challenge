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

  userLogin = async (email, password) => {

    const response = await this.movieReviewModel.userLogin(email, password);   
   
    if (response) return {response};

    const jwtConfig = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ key: 'itau-devs' }, this.SECRET, jwtConfig);

    return token;
  }

  getMovieInfosByTitle = async (movie) => {
    const response = await this.movieReviewModel.getMovieInfosByTitle(movie);  
    
    return response;
  }

  scoreMovieByTitle = async (movie, note, userId) => {
    const response = await this.movieReviewModel.scoreMovieByTitle(movie, note, userId);

    return response;    
  } 
}

module.exports = {MovieReviewService}
