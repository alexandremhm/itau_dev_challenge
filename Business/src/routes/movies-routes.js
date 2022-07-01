const router = require('express').Router();
const {verifyToken} = require('../middlewares/validate-token');
const {MovieReviewController} = require('../controllers');
const { validateRequiredCommentFields } = require('../middlewares/validate-comment-movie-fields');
const { validateReplyComment } = require('../middlewares/validate-reply-comment');
const { validateQuoteComment } = require('../middlewares/validate-quote-comment');

const movieReviewController = new MovieReviewController();

router.post(`/movies-review/get-movie-infos`, verifyToken, movieReviewController.getMovieInfosByTitle);

router.post(`/movies-review/comment/:userId`, verifyToken, validateRequiredCommentFields, movieReviewController.commentMovie);

router.post(`/movies-review/reply-comment/:userId`, verifyToken, validateReplyComment,  movieReviewController.replyComment);

router.post(`/movies-review/quote-comment/:userId`, verifyToken, validateQuoteComment, movieReviewController.quoteComment);

router.post(`/movies-review/like-comment/:userId/:commentId`, verifyToken, movieReviewController.likeComment);

router.post(`/movies-review/comment-repeated/:userId/:commentId`, verifyToken, movieReviewController.commentIsRepeated);

router.post(`/movies-review/delete-comment/:userId/:commentId`, verifyToken, movieReviewController.commentDelete);

router.post(`/movies-review/score/:userId`, verifyToken, movieReviewController.scoreMovieByTitle);

module.exports = router;
