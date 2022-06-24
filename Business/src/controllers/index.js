const { MovieReviewService } = require("../services");

class MovieReviewController {  
  constructor () {
    this.movieReviewService = new MovieReviewService();
  }

  getMovieByTitle = async (req, res) => {    
    const { movieTitle } = req.params;
    try {
      const response = await this.movieReviewService.getMovieByTitle(movieTitle);
      return res.status(200).json({ message: 'Success! Movie found, have fun!', response });
    } catch {
      return res.status(404).json({ message: 'Movie not found!' });
    }
  };

  userRegister = async (req, res) => {
    const { name, password, email } = req.body;
    try {
      await this.movieReviewService.userRegister({ name, password, email });
      return res.status(201).json({ message: 'Success! User has been registered!' });
    } catch {
      return res.status(500).json({ message: 'An unexpected server error occurred, please try again later!' });
    }
  };
}

module.exports = {MovieReviewController}
