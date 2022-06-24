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

    const token = jwt.sign({ email }, this.SECRET, jwtConfig);

    return token;
  }
}

module.exports = {MovieReviewService}
