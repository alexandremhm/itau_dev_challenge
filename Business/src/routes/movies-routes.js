const router = require('express').Router();
const {verifyToken} = require('../middlewares/validate-token');
const {MovieReviewController} = require('../controllers')

const movieReviewController = new MovieReviewController();

router.post(`/movies-review/get-movie-infos`, verifyToken, movieReviewController.getMovieInfosByTitle);

router.post(`/movies-review/comment/:userId`, verifyToken, movieReviewController.commentMovie);

router.post(`/movies-review/score/:userId`, verifyToken, movieReviewController.scoreMovieByTitle);

module.exports = router;
