const jwt = require('jsonwebtoken');
const NodeCache = require( "node-cache" );

const { MovieReviewModel } = require("../models");

class MovieReviewService {
  constructor () {
    this.SECRET = process.env.SECRET;
    this.movieReviewModel = new MovieReviewModel();
    this.loginCache = new NodeCache();
  } 

  getCache = async (key) => {
    return this.loginCache.get(key);
  }

  setCache = async (key, value) => {
    const response = await this.getCache(key)

    if (response && response.attempts === 3) {
      return 'Number of allowed attempts exceeded, user blocked'
    }

    if (response) {
      const newSet = {...response, attempts: Number(response.attempts) + 1}
      this.loginCache.set(key, newSet);
      return "Email or password do not exists!";
    }

    this.loginCache.set(key, value);
  }


  userLogin = async (email, password) => {
    let response = await this.movieReviewModel.userLogin(email, password);   
   
    if (response) {
      const cacheResponse = await this.setCache(email.email, {attempts: 1});
      response = cacheResponse ? cacheResponse : response;
      return {response}
    };

    const jwtConfig = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ key: 'itau-devs' }, this.SECRET, jwtConfig);

    return token;
  }  
}

module.exports = {MovieReviewService}
