const {getMovieByTitle} = require('../api/movie-search-api')

class MovieReviewService {
  getMovieByTitle = async (movie) => {
    return await getMovieByTitle(movie);
  }
}

module.exports = {MovieReviewService}
