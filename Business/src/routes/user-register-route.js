const router = require('express').Router();
const {MovieReviewController} = require('../controllers');
const {validateRequiredDataRegister} = require('../middlewares/validate-required-data-register');
const {validateUserExists} = require('../middlewares/validate-user-exists');

const movieReviewController = new MovieReviewController();

router.post('/register', validateRequiredDataRegister, validateUserExists, movieReviewController.userRegister);

module.exports = router;
