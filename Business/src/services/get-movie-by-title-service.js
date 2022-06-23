const { MovieReviewService } = require(".");

const movieReviewService = new MovieReviewService()

movieReviewService.getMovieByTitle('old').then((response) => console.log(response))