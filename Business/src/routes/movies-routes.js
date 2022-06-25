const router = require('express').Router();
const {verifyToken} = require('../middlewares/validate-token');
const {MovieReviewController} = require('../controllers')

const movieReviewController = new MovieReviewController();

router.post(`/movies-review/get-movie-infos`, verifyToken, movieReviewController.getMovieInfosByTitle);

module.exports = router;
