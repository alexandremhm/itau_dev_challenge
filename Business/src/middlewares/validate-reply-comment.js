const validateReplyComment = (req, res, next) => {
  const { movieCommentId, commentReply } = req.body;

  if (!movieCommentId) {
    return res.status(403).json({ message: 'movieCommentId is required!' })
  }

  if (!commentReply) {
    return res.status(403).json({ message: 'commentReply is required!' })
  } 

  next();
};

module.exports = {validateReplyComment};