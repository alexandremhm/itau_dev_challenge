const router = require('express').Router();
const {verifyToken} = require('../middlewares/validate-token');
const {MovieReviewController} = require('../controllers')

const movieReviewController = new MovieReviewController();

router.post(`/movies-review/get-movie-infos`, verifyToken, movieReviewController.getMovieInfosByTitle);

router.post(`/movies-review/comment/:userId`, verifyToken, movieReviewController.commentMovie);

router.post(`/movies-review/reply-comment/:userId`, verifyToken, movieReviewController.replyComment);

router.post(`/movies-review/quote-comment/:userId`, verifyToken, movieReviewController.quoteComment);

router.post(`/movies-review/like-comment/:userId/:commentId`, verifyToken, movieReviewController.likeComment);

router.post(`/movies-review/comment-repeated/:userId/:commentId`, verifyToken, movieReviewController.commentIsRepeated);

router.post(`/movies-review/delete-comment/:userId/:commentId`, verifyToken, movieReviewController.commentDelete);

router.post(`/movies-review/score/:userId`, verifyToken, movieReviewController.scoreMovieByTitle);

module.exports = router;
