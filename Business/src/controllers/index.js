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
      return res.status(403).json({ message: 'Movie not found!' });
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

  getMovieInfosByTitle = async (req, res) => {
    const {movie} = req.body;
    try {
      const movieInfos = await this.movieReviewService.getMovieInfosByTitle(movie);
      if (typeof movieInfos === 'string') return res.status(404).json({message: movieInfos});
      return res.status(201).json({ message: 'Success! movie found', movieInfos });
    } catch (err) {
      return res.status(500).json({ message: 'An unexpected server error occurred, please try again later!' });
    }
  }

  scoreMovieByTitle = async (req, res) => {
    const {movie, note} = req.body;
    const {userId} = req.params;
    
    try {
      await this.movieReviewService.scoreMovieByTitle(movie, note, userId);
      return res.status(201).json({ message: 'Success! movie scored' });
    } catch (err) {
      return res.status(500).json({ message: 'An unexpected server error occurred, please try again later!' });
    }
  }

  commentMovie = async (req, res) => {
    const {movie, comment} = req.body;
    const {userId} = req.params;
    try {
      const response = await this.movieReviewService.commentMovie(userId, movie, comment);
      if (response) return res.status(404).json({ message: response });
      return res.status(201).json({ message: 'Success! movie commented' });
    } catch (err) {
      return res.status(500).json({ message: 'An unexpected server error occurred, please try again later!' });
    }
  }

  replyComment = async (req, res) => {
    const {movieCommentId, commentReply} = req.body;
    const {userId} = req.params;
    try {
      const response = await this.movieReviewService.replyComment(userId, movieCommentId, commentReply);
      if (response) return res.status(404).json({ message: response });
      return res.status(201).json({ message: 'Success! movie commented' });
    } catch (err) {
      return res.status(500).json({ message: 'An unexpected server error occurred, please try again later!' });
    }
  }

  quoteComment = async (req, res) => {
    const {commentId, comment} = req.body;
    const {userId} = req.params;
    try {
      const response = await this.movieReviewService.quoteComment(userId, commentId, comment);
      return res.status(200).json({ message: response });
    } catch (err) {
      return res.status(500).json({ message: 'An unexpected server error occurred, please try again later!' });
    }
  }

  likeComment = async (req, res) => {
    const {userId, commentId} = req.params;
    try {
      await this.movieReviewService.likeComment(userId, commentId);
      return res.status(200).json({ message: 'Success! comment liked!' });
    } catch (err) {
      return res.status(500).json({ message: 'An unexpected server error occurred, please try again later!' });
    }
  }

  commentIsRepeated = async (req, res) => {
    const {userId, commentId} = req.params;
    try {
      const response = await this.movieReviewService.commentIsRepeated(userId, commentId);
      if (response) return res.status(404).json({ message: response });
      return res.status(200).json({ message: 'Success! comment marked as repeated!' });
    } catch (err) {
      return res.status(500).json({ message: 'An unexpected server error occurred, please try again later!' });
    }
  }

  commentDelete = async (req, res) => {
    const {userId, commentId} = req.params;
    try {
      const response = await this.movieReviewService.commentDelete(userId, commentId);
      if (response) return res.status(404).json({ message: response });
      return res.status(200).json({ message: 'Success! comment deleted!' });
    } catch (err) {
      return res.status(500).json({ message: 'An unexpected server error occurred, please try again later!' });
    }
  }

  promoteUserToModerator = async (req, res) => {
    const {userId, userToPromoteId} = req.params;
    try {
      const response = await this.movieReviewService.promoteUserToModerator(userId, userToPromoteId);
      if (response) return res.status(404).json({ message: response });
      return res.status(200).json({ message: 'Success! user promoted to moderator!'});
    } catch (err) {
      return res.status(500).json({ message: 'An unexpected server error occurred, please try again later!' });
    }
  }

}

module.exports = {MovieReviewController}
