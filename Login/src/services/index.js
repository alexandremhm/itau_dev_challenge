const jwt = require('jsonwebtoken');
const { MovieReviewModel } = require("../models");

class MovieReviewService {
  constructor () {
    this.SECRET = process.env.SECRET;
    this.movieReviewModel = new MovieReviewModel();
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
}

module.exports = {MovieReviewService}
