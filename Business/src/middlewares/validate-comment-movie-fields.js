const validateRequiredCommentFields = (req, res, next) => {
  const { movie, comment } = req.body;

  if (!movie) {
    return res.status(403).json({ message: 'Movie name is required!' })
  }

  if (!comment) {
    return res.status(403).json({ message: 'Comment is required!' })
  } 

  next();
};

module.exports = {validateRequiredCommentFields};