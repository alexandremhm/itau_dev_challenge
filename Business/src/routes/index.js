const getMovieByTitle = require('./get-movie-by-title-route');
const userRegister = require('./user-register-route');
const userLogin = require('./user-login-route');
const movies = require('./movies-routes');

module.exports = {
  getMovieByTitle,
  userRegister,
  userLogin,
  movies,
};
