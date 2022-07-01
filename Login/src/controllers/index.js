const { MovieReviewService } = require("../services");

class MovieReviewController {  
  constructor () {
    this.movieReviewService = new MovieReviewService();
  }

  userLogin = async (req, res) => {
    const {email, password} = req.body;    
    try {
      const token = await this.movieReviewService.userLogin({email, password});

      if (typeof token !== 'string')  return res.status(401).json({ message: token.response });

      return res.status(200).json({ message: `Success! Wellcome ${email}`, token });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }  
}

module.exports = {MovieReviewController}
