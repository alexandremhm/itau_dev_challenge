const validateQuoteComment = (req, res, next) => {
  const { commentId, comment } = req.body;

  if (!commentId) {
    return res.status(403).json({ message: 'commentId is required!' })
  }

  if (!comment) {
    return res.status(403).json({ message: 'Comment is required!' })
  } 

  next();
};

module.exports = {validateQuoteComment};