const router = require('express').Router();
const {MovieReviewController} = require('../controllers');
const { validateLogin } = require('../middlewares/validate-login');

const movieReviewController = new MovieReviewController();

router.post('/login', validateLogin, movieReviewController.userLogin);

module.exports = router;
