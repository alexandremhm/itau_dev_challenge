const { MovieReviewService } = require("../services");

class MovieReviewController {  
  constructor () {
    this.movieReviewService = new MovieReviewService()
  }

  getMovieByTitle = async (req, res) => {    
    const { movieTitle } = req.params;
    try {
      const response = await this.movieReviewService.getMovieByTitle(movieTitle);
      return res.status(200).json({ message: 'Success! Movie found, have fun!', response });
    } catch {
      return res.status(404).json({ message: 'Movie not found!' });
    }
  }
}

module.exports = {MovieReviewController}
