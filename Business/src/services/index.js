const {getMovieByTitle} = require('../api/movie-search-api')
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
}

module.exports = {MovieReviewService}
