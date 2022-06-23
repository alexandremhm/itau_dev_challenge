const router = require('express').Router();
const {MovieReviewController} = require('../controllers')

const movieReviewController = new MovieReviewController();

router.get(`/movies-review/get-movie-by-title/:title`, movieReviewController.getMovieByTitle);

module.exports = router;
