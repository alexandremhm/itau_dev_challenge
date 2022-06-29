const router = require('express').Router();
const {MovieReviewController} = require('../controllers');
const {validateRequiredDataRegister} = require('../middlewares/validate-required-data-register');
const { verifyToken } = require('../middlewares/validate-token');
const {validateUserExists} = require('../middlewares/validate-user-exists');

const movieReviewController = new MovieReviewController();

router.post('/register', validateRequiredDataRegister, validateUserExists, movieReviewController.userRegister);

router.post('/register/promote-user/:userId/:userToPromoteId', verifyToken, movieReviewController.promoteUserToModerator);

module.exports = router;
