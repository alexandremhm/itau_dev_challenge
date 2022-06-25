const router = require('express').Router();
const {verifyToken} = require('../middlewares/validate-token');
const {MovieReviewController} = require('../controllers')

const movieReviewController = new MovieReviewController();

router.get(`/movies-review/get-movie-by-title/:title`, verifyToken, movieReviewController.getMovieByTitle);

module.exports = router;
